import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { UserInterface } from 'interfaces'
import { emptyUser } from 'utils/data/userConstants'
import { TeamAvatar } from 'components/TeamAvatar/TeamAvatar'
import { Avatar } from 'components/Avatar/Avatar'
import { RiGithubLine } from 'react-icons/ri'
import { FiLinkedin } from 'react-icons/fi'
import { TbBriefcase2 } from 'react-icons/tb'
import { createOrGetPrivateChatRoom } from 'utils/api/chat'
import {
  onScreenUpdate,
  processChatRoom,
  setCurrentChat,
  toggleChatOpen,
} from 'utils/redux/slices/chatSlice'
import { ChatScreen } from 'utils/data/chatConstants'
import { useChatSocketEvents } from 'components/Socket/chatSocket'
import './UserProfile.scss'
import { PrimaryButton } from 'components/Buttons'
import { isSandboxId, isWaitlistExperience } from 'utils/helpers/taskHelpers'
import { selectMembers } from 'utils/redux/slices/teamMembersSlice'

export const UserProfile: React.FC = () => {
  const authUser = useAppSelector(selectAuthUser)
  const { userId } = useParams()
  const teamMembers = useAppSelector(selectMembers)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { createNewRoom } = useChatSocketEvents(false)
  const [userProfileInfo, setUserProfileInfo] =
    useState<UserInterface>(emptyUser)
  const sameProfile = authUser._id === userId ? true : false
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    let userProfile
    if (authUser._id === userId) {
      userProfile = authUser
    } else {
      userProfile = teamMembers.find(member => member._id === userId)
    }

    setUserProfileInfo(userProfile)
  }, [teamMembers, userProfileInfo, authUser, userId])

  // BC-334: should handle this case
  if (!userProfileInfo || !userProfileInfo._id) {
    return <div>Loading user... or there isn't one.</div>
  }

  const handleProfileMessageClick = async () => {
    const { _id: memberId } = userProfileInfo
    setIsLoading(true)
    try {
      const {
        payment: { experience: userExperience },
      } = authUser
      if (isSandboxId(userExperience) || isWaitlistExperience(userExperience)) {
        dispatch(toggleChatOpen())
        dispatch(onScreenUpdate(ChatScreen.Main))
      } else {
        if (userProfileInfo) {
          const chatResponse = await createOrGetPrivateChatRoom(memberId)
          let room = chatResponse.chatRoom
          room = await dispatch(processChatRoom(room)).unwrap()
          if (chatResponse.isNew) {
            createNewRoom({ chatRoom: room, receiverIds: [memberId] })
          }
          dispatch(setCurrentChat(room))
          dispatch(toggleChatOpen())
          dispatch(onScreenUpdate(ChatScreen.ChatRoom))
        }
      }
      setIsLoading(false)
    } catch (error) {
      console.error('Error in chat open: ', error)
      setIsLoading(false)
    }
  }

  const routeToEdit = () => {
    navigate(`/users/${authUser._id}/edit`)
  }

  return (
    <div className='userProfile'>
      <div className='userProfile__container'>
        <div className='userProfile__titleContainer'>
          <div className='userProfile__image'>
            {sameProfile ? (
              <Avatar clickable={false} userId={userProfileInfo._id} />
            ) : (
              <TeamAvatar userId={userId} size='medium' />
            )}
          </div>
          <div className='userProfile__title'>
            <h2>
              {userProfileInfo.firstName} {userProfileInfo.lastName}
            </h2>
            {userProfileInfo.role && <h3>{userProfileInfo.role}</h3>}
          </div>
          <PrimaryButton
            loading={isLoading}
            label={sameProfile ? 'Edit profile' : 'Message'}
            onClick={sameProfile ? routeToEdit : handleProfileMessageClick}
            style={{ position: 'absolute', top: '0', right: '0' }}
          />
        </div>
        {userProfileInfo.bio && (
          <div className='userProfile__infoContainer'>
            <h3>About me</h3>
            {<p>{userProfileInfo.bio}</p>}
          </div>
        )}
        <UserInfoLinks links={userProfileInfo.links} />
      </div>
    </div>
  )
}

const UserInfoLinks = ({ links }) => {
  return (
    <div className='userProfile__linksContainer'>
      {links?.linkedinUrl && (
        <div className='userProfile__linkItem'>
          <FiLinkedin className='userProfile__icons' />
          <div className='userProfile__linkLast'>
            <h3>LinkedIn</h3>
            <a
              className='userProfile__url'
              href={links.linkedinUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              {links.linkedinUrl}
            </a>
          </div>
        </div>
      )}

      {links?.portfolioUrl && (
        <div className='userProfile__linkItem'>
          <TbBriefcase2 className='userProfile__icons' />
          <div className='userProfile__link'>
            <h3>Portfolio</h3>
            <a
              className='userProfile__url'
              href={links.portfolioUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              {links.portfolioUrl}
            </a>
          </div>
        </div>
      )}

      {links?.githubUrl && (
        <div className='userProfile__linkItem'>
          <RiGithubLine className='userProfile__icons' />
          <div className='userProfile__link'>
            <h3>Github</h3>
            <a
              className='userProfile__url'
              href={links.githubUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              {links.githubUrl}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

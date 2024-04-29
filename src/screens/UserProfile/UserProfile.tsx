import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { selectMembersAsTeam } from 'utils/redux/slices/projectSlice'
import { UserInterface } from 'interfaces'
import { emptyUser } from 'utils/data/userConstants'
import Avatar from 'components/Avatar/Avatar'
import { RiGithubLine } from 'react-icons/ri'
import { FiLinkedin } from 'react-icons/fi'
import { TbBriefcase } from 'react-icons/tb'
import { createOrGetPrivateChatRoom } from 'utils/api/chat'
import {
  onScreenUpdate,
  processChatRoom,
  setCurrentChat,
  toggleChatOpen,
} from 'utils/redux/slices/chatSlice'
import { ChatScreen } from 'utils/data/chatConstants'
import { useSocketEvents } from 'components/Notifications/Socket'
import './UserProfile.scss'
import { isSandboxId, isWaitlistExperience } from 'utils/helpers/taskHelpers'

export const UserProfile: React.FC = () => {
  const authUser = useAppSelector(selectAuthUser)
  const { userId } = useParams()
  const teamMembers = useAppSelector(selectMembersAsTeam)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { createNewRoom } = useSocketEvents(false)
  const [userProfileInfo, setUserProfileInfo] =
    useState<UserInterface>(emptyUser)
  const sameProfile = authUser._id === userId ? true : false

  useEffect(() => {
    let userProfile
    if (authUser._id === userId) {
      userProfile = authUser
    } else {
      userProfile = teamMembers.find(member => member._id === userId)
    }

    setUserProfileInfo(userProfile)
  }, [authUser, teamMembers, userProfileInfo])

  // BC-334: should handle this case
  if (!userProfileInfo || !userProfileInfo._id) {
    return <div>Loading user... or there isn't one.</div>
  }

  const handleProfileMessageClick = async () => {
    const { _id: memberId } = userProfileInfo
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
    } catch (error) {
      console.error('Error in chat open: ', error)
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
            <Avatar clickable={false} userId={userProfileInfo._id} />
          </div>
          <div className='userProfile__title'>
            <h2>
              {userProfileInfo.firstName} {userProfileInfo.lastName}
            </h2>
            {userProfileInfo.role && <h3>{userProfileInfo.role}</h3>}
          </div>
          {sameProfile ? (
            <button className='userProfile__editBtn' onClick={routeToEdit}>
              Edit Profile
            </button>
          ) : (
            <button
              className='userProfile__messageBtn'
              onClick={handleProfileMessageClick}
            >
              Message
            </button>
          )}
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
  const { githubUrl, linkedinUrl, portfolioUrl } = links
  return (
    <div className='userProfile__linksContainer'>
      {linkedinUrl && (
        <div className='userProfile__linkItem'>
          <FiLinkedin className='userProfile__icons' />
          <div className='userProfile__linkLast'>
            <h3>LinkedIn</h3>
            <a
              className='userProfile__url'
              href={linkedinUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              {linkedinUrl}
            </a>
          </div>
        </div>
      )}

      {portfolioUrl && (
        <div className='userProfile__linkItem'>
          <TbBriefcase className='userProfile__icons' />
          <div className='userProfile__link'>
            <h3>Portfolio</h3>
            <a
              className='userProfile__url'
              href={portfolioUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              {portfolioUrl}
            </a>
          </div>
        </div>
      )}

      {githubUrl && (
        <div className='userProfile__linkItem'>
          <RiGithubLine className='userProfile__icons' />
          <div className='userProfile__link'>
            <h3>Github</h3>
            <a
              className='userProfile__url'
              href={githubUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              {githubUrl}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

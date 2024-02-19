import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { selectMembersAsTeam } from 'utils/redux/slices/projectSlice'
import { UserInterface } from 'interfaces'
import { emptyUser } from 'utils/data/userConstants'
import { TeamAvatar } from 'components/TeamAvatar/TeamAvatar'
import { RiGithubLine } from 'react-icons/ri'
import { FiLinkedin } from 'react-icons/fi'
import { TbBriefcase } from 'react-icons/tb'
import './UserProfile.scss'
import { createOrGetPrivateChatRoom } from 'utils/api/chat'
import {
  onScreenUpdate,
  processChatRoom,
  setCurrentChat,
  toggleChatOpen,
} from 'utils/redux/slices/chatSlice'
import { ChatScreen } from 'utils/data/chatConstants'
import { useSocketEvents } from 'components/Notifications/Socket'

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
  }, [teamMembers, userProfileInfo])

  // BC-334: should handle this case
  if (!userProfileInfo || !userProfileInfo._id) {
    return <div>Loading user... or there isn't one.</div>
  }

  const handleProfileMessageClick = async () => {
    const { _id: memberId } = userProfileInfo
    try {
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
    } catch (error) {
      console.error('Error in chat open: ', error)
    }
  }

  const shouldShowName =
    authUser && userProfileInfo.firstName && userProfileInfo.lastName

  const shouldShowRole =
    userProfileInfo &&
    (userProfileInfo.role === 'Software Engineer' ||
      userProfileInfo.role === 'UX Designer')

  const shouldShowBio = shouldShowRole && userProfileInfo && userProfileInfo.bio

  const routeToEdit = () => {
    navigate(`/users/${authUser._id}/edit`)
  }

  return (
    <div className='userProfile'>
      <div className='userProfile__container'>
        <div className='userProfile__titleContainer'>
          <div className='userProfile__image'>
            <TeamAvatar userId={userId} />
          </div>
          <div className='userProfile__title'>
            {shouldShowName && (
              <h2>
                {userProfileInfo.firstName} {userProfileInfo.lastName}
              </h2>
            )}
            {shouldShowRole && <h3>{userProfileInfo.role}</h3>}
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
        <div className='userProfile__infoContainer'>
          <h3>About me</h3>
          {shouldShowBio && <p>{userProfileInfo.bio}</p>}
        </div>
        <UserInfoLinks
          userProfileInfo={userProfileInfo}
          shouldShowRole={shouldShowRole}
        />
      </div>
    </div>
  )
}

const UserInfoLinks = ({ userProfileInfo, shouldShowRole }) => {
  const shouldShowPortfolioUrl =
    shouldShowRole &&
    userProfileInfo &&
    userProfileInfo.links &&
    userProfileInfo.links.portfolioUrl

  const shouldShowGithubUrl =
    userProfileInfo &&
    userProfileInfo.role === 'Software Engineer' &&
    userProfileInfo.links &&
    userProfileInfo.links.githubUrl

  const shouldShowLinkedInUrl =
    shouldShowRole &&
    userProfileInfo &&
    userProfileInfo.links &&
    userProfileInfo.links.linkedinUrl

  return (
    <div className='userProfile__linksContainer'>
      <div className='userProfile__linkItem'>
        <FiLinkedin className='userProfile__icons' />
        <div className='userProfile__linkLast'>
          <h3>LinkedIn</h3>
          {shouldShowLinkedInUrl && (
            <a
              className='userProfile__url'
              href={userProfileInfo.links.linkedinUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              {userProfileInfo.links.linkedinUrl}
            </a>
          )}
        </div>
      </div>

      <div className='userProfile__linkItem'>
        <TbBriefcase className='userProfile__icons' />
        <div className='userProfile__link'>
          <h3>Portfolio</h3>
          {shouldShowPortfolioUrl && (
            <a
              className='userProfile__url'
              href={userProfileInfo.links.portfolioUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              {userProfileInfo.links.portfolioUrl}
            </a>
          )}
        </div>
      </div>

      <div className='userProfile__linkItem'>
        <RiGithubLine className='userProfile__icons' />
        <div className='userProfile__link'>
          <h3>Github</h3>
          {shouldShowGithubUrl && (
            <a
              className='userProfile__url'
              href={userProfileInfo.links.githubUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              {userProfileInfo.links.githubUrl}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

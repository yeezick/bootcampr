import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAuthUser } from 'utils/redux/slices/userSlice'
import { getAllUsers } from 'utils/api/users'
import { AiOutlineStop, AiOutlineCheckCircle } from 'react-icons/ai'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { getRandomInt } from 'screens/AccountSettings/helper/data'
import { storeUserProject } from 'utils/helpers/stateHelpers'
import './Landing.scss'
import { Button } from '@mui/material'
import {
  onScreenUpdate,
  setCurrentConversation,
  setSelectedMember,
  toggleChatOpen,
} from 'utils/redux/slices/chatSlice'
import {
  createPrivateChatRoom,
  getAllConversations,
  getUserPrivateConversations,
} from 'utils/api/chat'
import { getProjectByUser } from 'utils/api'
import dummyMembers from './members.json'
import { ChatScreen } from 'utils/data/chatConstants'

export const Landing: React.FC = () => {
  const [loginStatus, setLoginStatus] = useState<boolean | null>(null)
  const authUser = useAppSelector(selectAuthUser)

  const dispatch = useDispatch()

  const randomUserLogin = async () => {
    if (authUser._id) {
      console.log('User already logged in')
      return
    }

    try {
      const gettingAllUser = await getAllUsers()
      if (gettingAllUser && gettingAllUser.length > 0) {
        const randomUser = gettingAllUser[getRandomInt(gettingAllUser.length)]
        dispatch(setAuthUser(randomUser))
        storeUserProject(dispatch, randomUser.project)
        setLoginStatus(true)
      } else {
        setLoginStatus(false)
      }
    } catch (err) {
      console.error('Unable to set random user:', err)
      setLoginStatus(false)
    }
  }

  useEffect(() => {
    authUser._id ? setLoginStatus(true) : setLoginStatus(false)
  }, [authUser._id])

  const LoginStatusSymbol: React.FC = () => {
    if (loginStatus === true && authUser._id) {
      return <AiOutlineCheckCircle className='logged-in' />
    } else {
      return <AiOutlineStop className='logged-out' />
    }
  }

  // ** temporary logic for Message button on Team Members screen
  const [projectMembers, setProjectMembers] = useState([])

  useEffect(() => {
    const { designers, engineers } = dummyMembers // ** Using dummy data. Should be using API or obtaining project members from redux store
    const members = [...designers, ...engineers]
    setProjectMembers(members.filter(member => member._id !== authUser._id))
  }, [])

  const handleButtonClick = (
    memberId: string,
    firstName: string,
    lastName: string,
    email: string,
    profilePicture: string
  ) => {
    try {
      const fetchConversations = async () => {
        const conversations = await getUserPrivateConversations(authUser._id)

        const existingChatWithMember = conversations.messageThreads.find(
          conversation =>
            conversation.participants.some(
              participant => participant._id === memberId
            )
        )

        if (existingChatWithMember) {
          // Opens existing convo containing project member
          dispatch(
            setCurrentConversation({
              _id: existingChatWithMember._id,
              isGroup: false,
              participants: [memberId],
              displayName: `${firstName} ${lastName}`,
            })
          )
          // Set selectedMember in Redux for private chats
          dispatch(
            setSelectedMember({
              _id: memberId,
              firstName,
              lastName,
              profilePicture,
            })
          )
        } else {
          // Creates new convo with selected project member
          const newRoom = await createPrivateChatRoom(authUser._id, email)

          dispatch(
            setCurrentConversation({
              _id: newRoom.chatRoom._id,
              isGroup: false,
              participants: [memberId],
              displayName: `${firstName} ${lastName}`,
            })
          )
          // Set selectedMember in Redux for private chats
          dispatch(
            setSelectedMember({
              _id: memberId,
              firstName,
              lastName,
              profilePicture,
            })
          )
        }
        dispatch(toggleChatOpen())
        dispatch(onScreenUpdate(ChatScreen.Messages))
      }
      fetchConversations()
    } catch (error) {
      console.error('Error fetching conversations', error)
    }
  }

  return (
    <div className='landing-container'>
      <div className='header-container'>
        <div className='header-grid'>
          <h1>Surpass Your Competition In The Tech Job Market</h1>
          <p>
            A platform to collaborate on real-world projects! Don't wait to
            build your development experience.
          </p>
          <Link to='/sign-up'>Start Today!</Link>
        </div>
        <div className='developer-grid'>
          <h1> For UX & Developers Only! </h1>
          <h2>
            Login as a random user using the button below <br /> Button is for
            devs who want to skip auth user flow
          </h2>
          <button onClick={randomUserLogin}>Login as random user</button>
          <LoginStatusSymbol />
        </div>
      </div>
      <div className='members-container'>
        {projectMembers.map(
          ({
            _id: memberId,
            firstName,
            lastName,
            email,
            role,
            profilePicture,
          }) => {
            return (
              <div key={memberId} className='member-card'>
                <div>
                  {firstName} {lastName}
                </div>
                <div>{role}</div>
                <Button
                  variant='contained'
                  className='message-button'
                  onClick={() =>
                    handleButtonClick(
                      memberId,
                      firstName,
                      lastName,
                      email,
                      profilePicture
                    )
                  }
                >
                  Message
                </Button>
              </div>
            )
          }
        )}
      </div>
    </div>
  )
}

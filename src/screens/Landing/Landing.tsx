import React, { useEffect, useState } from 'react'
import heroImage from 'assets/Images/hero-image.png'
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
import {
  onScreenUpdate,
  setCurrentConversation,
  setSelectedMember,
  toggleChatOpen,
} from 'utils/redux/slices/chatSlice'
import {
  createPrivateChatRoom,
  getUserPrivateConversations,
} from 'utils/api/chat'
import dummyMembers from './members.json' // to be removed once Message button logic is properly configured in team members screen
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

        let conversationId: string = null

        if (existingChatWithMember) {
          conversationId = existingChatWithMember._id
        } else {
          const newRoom = await createPrivateChatRoom(authUser._id, email)

          conversationId = newRoom.chatRoom._id
        }
        dispatch(
          setCurrentConversation({
            _id: conversationId,
            isGroup: false,
            participants: [memberId],
            displayName: `${firstName} ${lastName}`,
          })
        )
        dispatch(
          setSelectedMember({
            _id: memberId,
            firstName,
            lastName,
            profilePicture,
          })
        )
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
      <div className='hero-container'>
        <div className='hero-content'>
          <div className='hero-text'>
            <div className='hero-text-1'>
              <span>Join a team.</span>
              <span>Build a product.</span>
              <span>Have fun!</span>
            </div>
            <div className='hero-text-2'>
              Gain the experience you <span className='bold-text'>need</span> to
              land the job you <span className='bold-text'>want</span>.
            </div>
          </div>
          <Link to='/sign-up' className='hero-button'>
            Sign up
          </Link>
        </div>
        <div className='hero-image'>
          <img src={heroImage} alt='hero' />
        </div>
      </div>
      <div className='teaser-container'>
        <div className='teaser-header'>UX Designers & Software Engineers</div>
        <div className='teaser-text'>
          <div className='teaser-text-1'>
            You just finished a boot camp-- <br />
            but to get experience in the “real world” you need...experience.
          </div>
          <div className='teaser-text-2'>Now what?</div>
          <div className='teaser-text-3'>
            Connect with fellow boot camp grads to complete and ship a product.{' '}
            <br />
            Gain experience working on a cross-functional team to get hired
            faster.
          </div>
        </div>
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import heroImage from 'assets/Images/hero-image.png'
import howItWorksImage from 'assets/Images/ideas-into-reality-image.png'
import checkMark from 'assets/Images/checkmark.png'
import projectImage1 from 'assets/Images/project-image-1.png'
import projectImage2 from 'assets/Images/project-image-2.png'
import projectImage3 from 'assets/Images/project-image-3.png'
import projectImage4 from 'assets/Images/project-image-4.png'
import projectImage5 from 'assets/Images/project-image-5.png'
import isThisForYou from 'assets/Images/is-this-for-you-image.png'
import buildImage from 'assets/Images/buildImage.png'
import gainImage from 'assets/Images/gainImage.png'
import joinImage from 'assets/Images/joinImage.png'

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

      <section>
        <div className='how-it-works'>
          <div className='text-content'>
            <div className='text-header'>How it works</div>
            <div className='text-list'>
              <span className='text-list-item'>
                <img src={checkMark} alt='checkmark' />
                <span>Sign up</span>
              </span>
              <span className='text-list-item'>
                <img src={checkMark} alt='checkmark' />
                <span>Tell us your role and availability for meetings</span>
              </span>
              <span className='text-list-item'>
                <img src={checkMark} alt='checkmark' />
                <span>
                  View the project prompt while Bootcampr matches you with a
                  team based on your role and availability
                </span>
              </span>
            </div>
          </div>
          <div className='image'>
            <img src={howItWorksImage} alt='how-it-works-icon' />
          </div>
        </div>
        <div className='your-project-portal'>
          <div className='header'>
            <span>Your Project Portal</span>
            <p>
              Work with your team using the tools provided to complete the
              project in 4 weeks.
            </p>
          </div>
          <div className='details'>
            <div className='details-content'>
              <div className='details-image'>
                <img src={projectImage1} alt='project-icon' />
              </div>
              <div className='details-text'>
                <div className='text-header'>Project Details</div>
                <div className='text-content'>
                  The project prompt tells you the problem, user groups to
                  consider, deliverables, and the scope. We provide a timeline
                  so you know what to expect during the 4-week project. Focus on
                  delivering a solution!
                </div>
              </div>
            </div>
            <div className='details-content'>
              <div className='details-text'>
                <div className='text-header'>Team</div>
                <div className='text-content'>
                  Get to know your team of 3 software engineers and 2 UX
                  Designers. View their profile to learn about them. Get links
                  to their LinkedIn profile page and past work. Message your
                  team members to say hi and introduce yourself!
                </div>
              </div>
              <div className='details-image'>
                <img src={projectImage2} alt='project-icon' />
              </div>
            </div>
            <div className='details-content'>
              <div className='details-image'>
                <img src={projectImage3} alt='project-icon' />
              </div>
              <div className='details-text'>
                <div className='text-header'>Calendar</div>
                <div className='text-content'>
                  Communication with your team is important. We provide a
                  calendar showing your full team’s availability to make it easy
                  to schedule meetings. We schedule the first one for you!
                </div>
              </div>
            </div>
            <div className='details-content'>
              <div className='details-text'>
                <div className='text-header'>Task Management</div>
                <div className='text-content'>
                  Most companies use a work management tool. We’ve created one
                  you can use to organize and track tasks. Hiring managers will
                  be happy to hear you’re familiar with task management tools!
                </div>
              </div>
              <div className='details-image'>
                <img src={projectImage4} alt='project-icon' />
              </div>
            </div>
            <div className='details-content'>
              <div className='details-image'>
                <img src={projectImage5} alt='project-icon' />
              </div>
              <div className='details-text'>
                <div className='text-header'>Submit your project!</div>
                <div className='text-content'>
                  You’ve done the work and deployed your project.We’re stoked to
                  see it! We give you the opportunity to present it to
                  professional UX Designers, Software Engineers, and Product
                  Managers. Use the feedback to present your project in
                  interviews with confidence!
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='is-this-for-you'>
          <div className='image'>
            <img src={isThisForYou} alt='is-for-you-icon' />
          </div>
          <div className='text-content'>
            <div className='text-header'>Is this for you ?</div>
            <div className='text-list'>
              <span className='text-list-item'>
                <img src={checkMark} alt='checkmark' />
                <span>
                  You’re a UXD or SWE study program graduate
                  <small>
                    <b>*SWEs should have MERN/full stack experience</b>
                  </small>
                </span>
              </span>
              <span className='text-list-item'>
                <img src={checkMark} alt='checkmark' />
                <span>You want to sharpen the skills you’ve developed </span>
              </span>
              <span className='text-list-item'>
                <img src={checkMark} alt='checkmark' />
                <span>
                  You want to work on a cross-functional team in a simulated
                  work environment
                </span>
              </span>
              <span className='text-list-item'>
                <img src={checkMark} alt='checkmark' />
                <span>
                  You're ready to showcase a shipped product on your portfolio
                  to talk about in interviews
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>
      <div className='team-workflow'>
        <div className='workflow'>
          <img src={buildImage} alt='build-icon' />
          <div className='text'>
            <span>Build a product</span>
            <p>Apply what you've learned</p>
          </div>
        </div>
        <div className='workflow'>
          <img src={gainImage} alt='gain-icon' />
          <div className='text'>
            <span>Gain experience</span>
            <p>Workplace-simulated environment</p>
          </div>
        </div>
        <div className='workflow'>
          <img src={joinImage} alt='join-icon' />
          <div className='text'>
            <span>Join a team</span>
            <p>Hiring managers look for soft skills</p>
          </div>
        </div>
      </div>
      <div className='get-job'>
        <span>You've done the work.</span>
        <span>Get the job.</span>
        <Link className='button' to='/sign-up'>
          Sign up
        </Link>
      </div>
      <div className='contact-container'>
        <div className='contact-wrapper'>
          <div className='contact-header'>
            <div className='question'>Questions?</div>
            <div className='contact'>Contact Us</div>
            <div className='text'>
              Our team will get back to you within 48-72 hours.
            </div>
          </div>
          <div className='contact-form'>
            <div>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                id='name'
                name='name'
                placeholder='Who are we speaking to?'
              />
            </div>
            <div>
              <label htmlFor='name'>Email address</label>
              <input
                type='email'
                id='email'
                name='email'
                placeholder='email@email.com'
              />
            </div>
            <div>
              <label htmlFor='message'>Message</label>
              <div className='message-box'>
                <textarea
                  name='message'
                  id='message'
                  cols={99}
                  rows={10}
                  placeholder='Ask Away!'
                ></textarea>
                <p className='word-count'>0/500</p>
              </div>
            </div>
          </div>
          <div className='contact-button'>Submit</div>
        </div>
      </div>
    </div>
  )
}

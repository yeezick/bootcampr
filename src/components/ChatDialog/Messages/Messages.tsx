import { useEffect, useState, useRef } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import {
  createGroupChatMessage,
  createPrivateMessage,
  getGroupChatMessages,
  getAllPrivateMessages,
} from 'utils/api/chat'
import { useSocket } from 'components/Notifications/Socket'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { selectConversation, setChatText } from 'utils/redux/slices/chatSlice'
import { setUnreadMessages } from 'utils/api'
import { MessagesList } from './MessagesList'
import './Messages.scss'

export const Messages = ({ setChatRecipientId }) => {
  const socket = useSocket()
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const currentConversation = useAppSelector(selectConversation)
  const textForm = useAppSelector(state => state.chat.chatText)
  const [messages, setMessages] = useState([])
  const [chatParticipants, setChatParticipants] = useState([])
  const [listResults, setListResults] = useState('empty')
  const [selectedMessages, setSelectedMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  //to trigger fetch
  const [isNewMessageReceived, setIsNewMessageReceived] = useState(false)
  const [membersWithUnreadMessages, setMembersWithUnreadMessages] = useState<
    string[]
  >([])
  const containerRef = useRef(null)

  useEffect(() => {
    if (socket) {
      const handleNewMessage = receivedMessage => {
        setNewMessage(receivedMessage.newMessage)
      }

      socket.on('message-from-server', handleNewMessage)
      return () => {
        socket.off('message-from-server', handleNewMessage)
      }
    }
  }, [socket, dispatch])
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        let messageRes
        if (currentConversation.isGroup) {
          messageRes = await getGroupChatMessages(
            authUser._id,
            currentConversation._id
          )
        } else {
          messageRes = await getAllPrivateMessages(
            authUser._id,
            currentConversation._id
          )
          setChatParticipants(messageRes.participants)
        }
        // combined messages = groupchat/private + media messages, this has text and sender info
        setMessages(messageRes.combinedMessages)

        if (
          !messageRes.combinedMessages ||
          messageRes.combinedMessages.length === 0 ||
          !messageRes
        ) {
          setListResults('noMessages')
        } else {
          setListResults('messages')
        }
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }
    fetchMessages()
  }, [
    authUser._id,
    currentConversation._id,
    currentConversation.isGroup,
    newMessage,
    isNewMessageReceived,
  ])
  useEffect(() => {
    if (socket) {
      const handleNewMessage = receivedMessage => {
        setNewMessage(receivedMessage.newMessage)
      }

      socket.on('message-from-server', handleNewMessage)
      return () => {
        socket.off('message-from-server', handleNewMessage)
      }
    }
  }, [socket, dispatch])

  // Scroll messages container to bottom for last message when component mounts and when the height change because of textarea
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages, containerRef.current?.style.height])

  const isArrayOfStrings = (arr: []) => {
    return arr.every(element => typeof element === 'string')
  }

  useEffect(() => {
    // Extracting all particpants in chat, excluding authUser
    // Will be appended to membersWithUnreadMessages array
    const getParticipantIds = () => {
      const participants = currentConversation?.participants
      if (!participants) return []

      if (isArrayOfStrings(participants)) {
        return participants.filter(userId => userId !== authUser._id)
      }

      if (currentConversation.isGroup) {
        return participants
          .filter((participant: { participant: { _id: string } }) => {
            const participantId = participant.participant?._id
            return participantId && participantId !== authUser._id
          })
          .map(
            (participant: { participant: { _id: string } }) =>
              participant.participant._id
          )
      }

      return participants
        .filter(
          (participant: { _id: string }) =>
            participant && participant._id !== authUser._id
        )
        .map((participant: { _id: string }) => participant._id)
    }

    const participantIds = getParticipantIds()
    setMembersWithUnreadMessages(participantIds)
  }, [authUser._id, currentConversation.participants])

  const handleTimestampClick = (message: any) => {
    // Logic to display/hide timestamp on message click:
    // Check if selected message is already present in selectedMessages array
    if (selectedMessages.some(msg => msg === message)) {
      // If it exists, remove it from the array
      setSelectedMessages(selectedMessages.filter(msg => msg !== message))
    } else {
      // If it doesn't exist, add it to the array
      setSelectedMessages([...selectedMessages, message])
    }
  }

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    //To keep the text draft when close or change the page
    dispatch(setChatText({ text: value }))
  }

  const handleSubmitText = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (textForm.text.trim() === '') return // Message will not send if textarea is empty

    try {
      let res
      if (currentConversation.isGroup) {
        res = await createGroupChatMessage(
          authUser._id,
          currentConversation._id,
          textForm.text
        )
      } else {
        res = await createPrivateMessage(
          authUser._id,
          currentConversation._id,
          textForm.text
        )
      }
      if (membersWithUnreadMessages.length > 0) {
        await setUnreadMessages(
          currentConversation._id,
          membersWithUnreadMessages
        )
      }
      socket.emit('send-message', {
        senderId: authUser._id,
        chatRoomId: currentConversation._id,
        newMessage: textForm.text,
      })
      setIsNewMessageReceived(true)
      dispatch(setChatText({ text: '' }))
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const handleKeyDown = e => {
    // Send message with 'Enter' key
    // Does not send with 'Enter' + 'Shift'
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmitText(e)
    }
  }

  const handleTextInputHeightChange = (heightDifference: Number) => {
    if (containerRef.current) {
      //Height should be the initial height(440) to calculate changes dynamically
      containerRef.current.style.height = `calc(440px - ${heightDifference}px)`
    }
  }
  return (
    <div className='messages-container'>
      <section className='messages-grid' ref={containerRef}>
        <MessagesList
          authUser={authUser}
          listResults={listResults}
          messages={messages}
          selectedMessages={selectedMessages}
          handleTimestampClick={handleTimestampClick}
        />
      </section>
      <TextInput
        textForm={textForm}
        handleChangeText={handleChangeText}
        handleKeyDown={handleKeyDown}
        handleSubmitText={handleSubmitText}
        onHeightChange={handleTextInputHeightChange}
      />
    </div>
  )
}

const TextInput = ({
  textForm,
  handleChangeText,
  handleKeyDown,
  handleSubmitText,
  onHeightChange,
}) => {
  const MAX_HEIGHT = 160
  const textareaRef = useRef<null | HTMLTextAreaElement>(null)

  const adjustHeight = () => {
    if (!textareaRef.current) return
    textareaRef.current.style.height = 'auto'
    const scrollHeight = textareaRef.current.scrollHeight
    let newHeight = Math.min(scrollHeight, MAX_HEIGHT)
    textareaRef.current.style.height = `${newHeight}px`
    onHeightChange(newHeight)
  }

  useEffect(() => {
    adjustHeight()
  }, [textForm.text])

  return (
    <div className='convo-input-container' tabIndex={0}>
      <textarea
        ref={textareaRef}
        onChange={handleChangeText}
        onKeyDown={handleKeyDown}
        name='text'
        value={textForm.text}
        placeholder='Type your message here...'
        rows={1}
      />
      {textForm.text !== '' && (
        <AiOutlineSend
          size={20}
          className='send-button'
          onClick={handleSubmitText}
        />
      )}
    </div>
  )
}

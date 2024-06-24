import { useEffect, useState, useRef } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { createGroupChatMessage, createPrivateMessage } from 'utils/api/chat'
import { useChatSocketEvents } from 'components/Socket/chatSocket'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import {
  selectChat,
  setActiveChatRoomId,
  setChatText,
} from 'utils/redux/slices/chatSlice'
import { Messages } from '../Messages/Messages'

export const ChatRoom = () => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const currentConversation = useAppSelector(selectChat)
  const textForm = useAppSelector(state => state.chatbox.chatText)
  const [selectedMessages, setSelectedMessages] = useState([])
  const containerRef = useRef(null)
  const { sendMessage } = useChatSocketEvents(true)

  useEffect(() => {
    dispatch(setActiveChatRoomId(currentConversation._id))
    return () => {
      dispatch(setActiveChatRoomId(null))
    }
  }, [dispatch, currentConversation._id])

  // Scroll messages container to bottom for last message when component mounts and when the height change because of textarea
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [containerRef.current?.style.height, currentConversation.messages])

  // Logic to display/hide timestamp on message click:
  const handleTimestampClick = (message: any) => {
    if (selectedMessages.some(msg => msg === message)) {
      setSelectedMessages(selectedMessages.filter(msg => msg !== message))
    } else {
      setSelectedMessages([...selectedMessages, message])
    }
  }

  //To keep the text draft when close or change the page
  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    dispatch(setChatText(value))
  }

  const handleSubmitText = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (textForm.trim() === '') return // Message will not send if textarea is empty

    try {
      if (currentConversation.chatType === 'group') {
        await createGroupChatMessage(currentConversation._id, textForm)
      } else {
        await createPrivateMessage(currentConversation._id, textForm)
      }
      const newMessage = {
        senderId: authUser._id,
        chatRoomId: currentConversation._id,
        newMessage: textForm,
        chatType: currentConversation.chatType,
      }
      sendMessage(newMessage)
      dispatch(setChatText(''))
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  // Send message with 'Enter' key, Does not send with 'Enter' + 'Shift'
  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmitText(e)
    }
  }

  const handleTextInputHeightChange = (
    heightDifference: Number,
    INITIAL_HEIGHT: Number
  ) => {
    //Height should be the initial height(440) to calculate changes dynamically
    if (containerRef.current) {
      containerRef.current.style.height = `calc(${INITIAL_HEIGHT}px - ${heightDifference}px)`
    }
  }

  return (
    <div className='messages-container'>
      <section className='messages-grid' ref={containerRef}>
        <Messages
          selectedMessages={selectedMessages}
          handleTimestampClick={handleTimestampClick}
        />
      </section>
      <MessageInputBox
        textForm={textForm}
        handleChangeText={handleChangeText}
        handleKeyDown={handleKeyDown}
        handleSubmitText={handleSubmitText}
        onHeightChange={handleTextInputHeightChange}
      />
    </div>
  )
}

const MessageInputBox = ({
  textForm,
  handleChangeText,
  handleKeyDown,
  handleSubmitText,
  onHeightChange,
}) => {
  const MAX_HEIGHT = 160
  const INITIAL_HEIGHT = 440
  const textareaRef = useRef<null | HTMLTextAreaElement>(null)

  const adjustHeight = () => {
    if (!textareaRef.current) return
    textareaRef.current.style.height = 'auto'
    const scrollHeight = textareaRef.current.scrollHeight
    let newHeight = Math.min(scrollHeight, MAX_HEIGHT)
    textareaRef.current.style.height = `${newHeight}px`
    onHeightChange(newHeight, INITIAL_HEIGHT)
  }

  useEffect(() => {
    adjustHeight()
  }, [textForm])

  return (
    <div className='convo-input-container' tabIndex={0}>
      <textarea
        ref={textareaRef}
        onChange={handleChangeText}
        onKeyDown={handleKeyDown}
        name='text'
        value={textForm}
        placeholder='Type your message here...'
        rows={1}
      />
      {textForm.text !== '' && (
        <div className='send-button'>
          <AiOutlineSend size={20} onClick={handleSubmitText} />
        </div>
      )}
    </div>
  )
}

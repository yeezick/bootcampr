import { useAppSelector } from 'utils/redux/hooks'
import { selectChat } from 'utils/redux/slices/chatSlice'
import { Message } from './Message'
import { EmptyChatPage } from '../ChatRoom/EmptyChatPage'

export const Messages = ({ selectedMessages, handleTimestampClick }) => {
  const currentConversation = useAppSelector(selectChat)
  const messages = currentConversation.messages || []
  const listResults = messages.length ? 'messages' : 'noMessages'

  if (listResults === 'noMessages') {
    return (
      <EmptyChatPage
        screen='NoMessages'
        text="Don't be shy! Start a conversation"
        className='no-results'
      />
    )
  }

  if (listResults === 'messages') {
    return (
      <>
        {messages.map((message, index) => (
          <Message
            key={message._id || index}
            message={message}
            index={index}
            messages={messages}
            selectedMessages={selectedMessages}
            handleTimestampClick={handleTimestampClick}
          />
        ))}
      </>
    )
  }
}

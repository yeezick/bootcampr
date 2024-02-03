import { ChatIcons } from 'utils/data/chatConstants'
import './ChatRoom.scss'

export const EmptyChatPage = ({ screen, text, className }) => {
  return (
    <div className={className}>
      <img src={ChatIcons[screen]} alt='no data' />
      <p>{text}</p>
    </div>
  )
}

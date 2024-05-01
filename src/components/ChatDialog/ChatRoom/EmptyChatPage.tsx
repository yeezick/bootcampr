import { ChatIcons } from 'utils/data/chatConstants'
import './ChatRoom.scss'
import { EmptyChatPageProps } from 'interfaces/ChatInterface'
import { PrimaryButton } from 'components/Buttons'

export const EmptyChatPage = ({
  screen,
  text,
  className,
  handler,
}: EmptyChatPageProps) => {
  console.log('handler', handler)
  return (
    <div className={className}>
      <img src={ChatIcons[screen]} alt='no data' />
      <p>{text}</p>
      {handler && (
        <PrimaryButton label={handler.text} onClick={handler.function} />
      )}
    </div>
  )
}

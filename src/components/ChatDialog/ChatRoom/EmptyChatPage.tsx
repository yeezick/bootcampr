import { ChatIcons } from 'utils/data/chatConstants'
import './ChatRoom.scss'
import { PrimaryButton } from 'components/Buttons'
import { EmptyChatPageProps } from 'interfaces/ChatInterface'

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
        <PrimaryButton text={handler.text} handler={handler.function} />
      )}
    </div>
  )
}

import './ChatDialogMain.scss'
import { HiOutlinePencilAlt } from 'react-icons/hi'

export const ChatDialogMain = () => {
  return (
    <div className='chat-dialog-container'>
      <section className='chat-header'>
        <h1>Chats</h1>
        <HiOutlinePencilAlt size={22} />
      </section>
    </div>
  )
}

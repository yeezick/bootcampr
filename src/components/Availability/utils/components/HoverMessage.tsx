import './HoverMessage.scss'

export const HoverMessage = ({ text }) => {
  return (
    <div className='hover-message'>
      <p>{text}</p>
    </div>
  )
}

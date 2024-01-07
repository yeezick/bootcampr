import checkMark from 'assets/Images/checkmark.png'
import { TextListItemProps } from 'interfaces/LandingPageInterfaces'

export const TextListItem: React.FC<TextListItemProps> = ({
  text,
  smallText,
}) => {
  return (
    <span className='text-list-item'>
      <img src={checkMark} alt='checkmark' />
      <span>
        {text}
        {smallText && (
          <small>
            <b>{smallText}</b>
          </small>
        )}
      </span>
    </span>
  )
}

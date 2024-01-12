import { DetailsContentProps } from 'interfaces/LandingPageInterfaces'

export const DetailsContent: React.FC<DetailsContentProps> = ({
  imagePath,
  textHeader,
  textContent,
}) => {
  return (
    <div className='details-content'>
      <div className='details-image'>
        <img src={imagePath} alt='project-icon' />
      </div>
      <div className='details-text'>
        <div className='text-header'>{textHeader}</div>
        <div className='text-content'>{textContent}</div>
      </div>
    </div>
  )
}

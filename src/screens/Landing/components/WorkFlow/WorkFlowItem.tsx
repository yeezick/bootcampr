import { WorkFlowItemProps } from 'interfaces/LandingPageInterfaces'

export const WorkFlowItem: React.FC<WorkFlowItemProps> = ({
  imagePath,
  altText,
  subtitle,
  actualText,
}) => {
  return (
    <div className='workflow'>
      <img src={imagePath} alt={altText} />
      <div className='text'>
        <span>{subtitle}</span>
        <p>{actualText}</p>
      </div>
    </div>
  )
}

type WorkFlowItemProps = {
  imagePath: string
  altText: string
  text1: string
  text2: string
}
export const WorkFlowItem: React.FC<WorkFlowItemProps> = ({
  imagePath,
  altText,
  text1,
  text2,
}) => {
  return (
    <div className='workflow'>
      <img src={imagePath} alt={altText} />
      <div className='text'>
        <span>{text1}</span>
        <p>{text2}</p>
      </div>
    </div>
  )
}

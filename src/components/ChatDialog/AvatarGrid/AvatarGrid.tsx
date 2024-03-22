import './AvatarGrid.scss'

export const AvatarGrid = ({ pictures, avatarSize }) => {
  const gridClassName = () => {
    if (pictures.length === 2) {
      return ['left-column', 'right-column']
    } else if (pictures.length === 3) {
      return ['merged-grid', '']
    } else {
      return ['', '', '', '']
    }
  }

  return (
    <div className={`photo-grid ${avatarSize}`}>
      {pictures.map((picture, index) => (
        <div key={index} className={gridClassName()[index]}>
          <img src={picture} alt='group' />
        </div>
      ))}
    </div>
  )
}

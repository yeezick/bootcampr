import { useNavigate } from 'react-router-dom'
import './SideMenu.scss'
import { AiFillStar } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { selectUserId } from 'utils/redux/slices/userSlice'

export const SideMenu = ({ title, items }) => {
  const userId = useSelector(selectUserId)
  return (
    <div className='side-menu'>
      <h1>{title}</h1>
      {items.map((item, idx) => {
        return (
          <MenuItem
            key={`${item}-${idx}`}
            item={item}
            userId={userId}
            title={title}
          />
        )
      })}
    </div>
  )
}

export const MenuItem = ({ item, userId, title }) => {
  const navigate = useNavigate()

  const renderItemScreen = item => {
    navigate(
      `/users/${userId}/${makeStringURLFriendly(title)}/${makeStringURLFriendly(
        item
      )}`
    )
  }

  return (
    <div className='menu-item' onClick={() => renderItemScreen(item)}>
      <AiFillStar size={18} />
      <h3>{item}</h3>
    </div>
  )
}

export const makeStringURLFriendly = string => {
  return string.toLowerCase().replace(' ', '-')
}

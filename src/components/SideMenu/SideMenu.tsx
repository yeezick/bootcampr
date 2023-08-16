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
        return <MenuItem key={`${item}-${idx}`} item={item} userId={userId} />
      })}
    </div>
  )
}

export const MenuItem = ({ item, userId }) => {
  const navigate = useNavigate()

  const renderItemScreen = item => {
    console.log(item)
    // TODO: swap blah for curent user id
    navigate(`/users/${userId}/settings/${item}`)
  }

  return (
    <div className='menu-item' onClick={() => renderItemScreen(item)}>
      <AiFillStar size={18} />
      <h3>{item}</h3>
    </div>
  )
}

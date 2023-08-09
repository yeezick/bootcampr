import { useNavigate } from 'react-router-dom'
import './SideMenu.scss'
import { AiFillStar } from 'react-icons/ai'

export const SideMenu = ({ title, items }) => {
  return (
    <div className='side-menu'>
      <h1>{title}</h1>
      {items.map((item, idx) => {
        return <MenuItem key={`${item}-${idx}`} item={item} />
      })}
    </div>
  )
}

export const MenuItem = ({ item }) => {
  const navigate = useNavigate()

  const renderItemScreen = item => {
    console.log(item)
    // navigate
    // should this be like layout?
    navigate(`/users/blah/settings/${item}`)
  }

  return (
    <div className='menu-item' onClick={() => renderItemScreen(item)}>
      <AiFillStar size={18} />
      <h3>{item}</h3>
    </div>
  )
}

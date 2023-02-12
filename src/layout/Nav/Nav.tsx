import { Link } from 'react-router-dom'
import { selectAuthUser } from 'utilities/redux/slices/users/userSlice'
import { useAppDispatch, useAppSelector } from 'utilities/redux/hooks'
import { toggleSidebar } from 'utilities/redux/slices/users/userSlice'
import Logo from 'assets/Logo.svg'
import './Nav.scss'

export const Nav = () => {
  const authUser = useAppSelector(selectAuthUser)
  const { _id: userId } = authUser
  const dispatch = useAppDispatch()

  const toggleSidebarHandler = () => {
    dispatch(toggleSidebar())
  }

  return (
    <nav>
      <div className='nav-container'>
        {userId !== '' ? (
          <div className='menu-btn' onClick={toggleSidebarHandler}>
            <i></i>
            <i></i>
            <i></i>
          </div>
        ) : null}
        <div className='logo'>
          <Link to='/'>
            <img src={Logo} />
          </Link>
        </div>
      </div>
      {userId !== '' ? null : (
        <div className='auth-btn'>
          <div>
            <Link className='link sign-up' to='/sign-up'>
              Sign up
            </Link>
          </div>

          <div>
            <Link className='link log-in' to='/sign-in'>
              Log in
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

import { Loader } from 'components/Loader/Loader'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { verify } from 'utils/api/users'
import { storeUserProject } from 'utils/helpers/stateHelpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectAuthUser,
  uiStatus,
  updateAuthUser,
} from 'utils/redux/slices/userSlice'

const unprotectedRoutes = ['/', '/sign-in', '/sign-up', '/how-to', '/about-us']

export const AuthWrapper = ({ children }) => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const authUser = useAppSelector(selectAuthUser)
  const status = useAppSelector(uiStatus)
  const isProtectedRoute = !unprotectedRoutes.includes(location.pathname)

  useEffect(() => {
    const verifyAndNavigateUser = async () => {
      try {
        const token = localStorage.getItem('bootcamprAuthToken')
        //to syncronize and get user info again after refreshing the page
        if (token && !authUser?._id) {
          const verifiedAuthUser = await verify()
          if (verifiedAuthUser?._id) {
            await storeUserProject(dispatch, verifiedAuthUser.project)
            dispatch(updateAuthUser(verifiedAuthUser))
          } else if (isProtectedRoute) {
            navigate('/sign-in')
          }
        } else if (!token && isProtectedRoute) {
          //user is not verified and the route is protected
          navigate('/sign-in')
        }
      } catch (error) {
        console.error('Error in auth verification: ', error)
        if (isProtectedRoute) {
          navigate('/sign-in')
        }
      }
    }

    verifyAndNavigateUser()
  }, [authUser._id, dispatch, location.pathname, navigate])

  if (status.isLoading) {
    return <Loader />
  }

  return <>{children}</>
}

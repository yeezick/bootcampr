import { Loader } from 'components/Loader/Loader'
import { useEffect } from 'react'
import { matchPath, useLocation, useNavigate } from 'react-router-dom'
import { verify } from 'utils/api/users'
import { isMobileWidth } from 'utils/helpers'
import { storeUserProject } from 'utils/helpers/stateHelpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectAuthUser,
  setAuthUser,
  setAuthUserLoading,
  uiStatus,
} from 'utils/redux/slices/userSlice'

const unprotectedRoutes = [
  '/',
  '/sign-in',
  '/sign-up',
  '/sign-up/:id/confirmation-email-sent',
  '/success',
  '/users/:id/expired-link',
  '/users/reset-password/:token',
  '/users/reset-password',
  '/how-to',
  '/about-us',
]

export const AuthWrapper = ({ children }) => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const authUser = useAppSelector(selectAuthUser)
  const status = useAppSelector(uiStatus)
  const isProtectedRoute = !unprotectedRoutes.some(route =>
    matchPath({ path: route, end: true }, location.pathname)
  )
  const [domain, paramId] = location.pathname.split('/').filter(Boolean)

  useEffect(() => {
    const verifyAndNavigateUser = async () => {
      dispatch(setAuthUserLoading(true))
      try {
        const token = localStorage.getItem('bootcamprAuthToken')
        //to syncronize and get user info again after refreshing the page
        if (token && !authUser?._id) {
          const verifiedAuthUser = await verify()
          if (verifiedAuthUser?._id) {
            dispatch(setAuthUser(verifiedAuthUser))
            const userHasValidProjectId =
              verifiedAuthUser.projects.activeProject === paramId ||
              verifiedAuthUser.projects.projects.includes(paramId)
            const isWaitlisted =
              paramId === 'waitlist' &&
              verifiedAuthUser.payment.experience === 'recurring'
            const userProjectId =
              verifiedAuthUser.projects.activeProject || 'waitlist'

            if (
              domain === 'project' &&
              !userHasValidProjectId &&
              !isWaitlisted
            ) {
              await storeUserProject(dispatch, userProjectId)
              navigate(`/project/${userProjectId}`, { replace: true })
              return
            }
            // Problem when user is matched to a team
            const projectId = domain === 'project' ? paramId : userProjectId
            await storeUserProject(dispatch, projectId)
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
      } finally {
        dispatch(setAuthUserLoading(false))
      }
    }

    verifyAndNavigateUser()
  }, [
    authUser,
    dispatch,
    location.pathname,
    navigate,
    paramId,
    authUser.projects.activeProject,
  ])

  useEffect(() => {
    const routeToMobileGate = () => {
      const { pathname } = location
      const currentPath = pathname.split('/').pop()
      const isMobileScreen =
        currentPath === 'confirmation-email-sent' || currentPath === 'sign-up'

      if (isMobileWidth() && !isMobileScreen) {
        navigate('/mobile')
      }
    }
    routeToMobileGate()
    window.addEventListener('resize', routeToMobileGate)
    return () => {
      window.removeEventListener('resize', routeToMobileGate)
    }
  }, [location.pathname])

  if (status.isLoading) {
    return <Loader />
  }

  return <>{children}</>
}

import { Loader } from 'components/Loader/Loader'
import { useEffect } from 'react'
import { matchPath, useLocation, useNavigate } from 'react-router-dom'
import { verify } from 'utils/api/users'
import { determineProjectIdByStatus, isMobileWidth } from 'utils/helpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  fetchAndStoreUserProject,
  selectProject,
} from 'utils/redux/slices/projectSlice'
import { fetchTeamMembers } from 'utils/redux/slices/teamMembersSlice'

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
        const token = localStorage.getItem('collabifyAuthToken')
        //to syncronize and get user info again after refreshing the page
        if (token && !authUser?._id) {
          const verifiedAuthUser = await verify()
          if (verifiedAuthUser?._id) {
            await dispatch(fetchTeamMembers(verifiedAuthUser._id)).unwrap()
            dispatch(setAuthUser(verifiedAuthUser))

            let projectId
            const paramIsValidProjectId =
              verifiedAuthUser.projects.activeProject === paramId ||
              verifiedAuthUser.projects.projects.includes(paramId)

            if (verifiedAuthUser.payment.experience === 'unchosen') {
              projectId = 'sandbox'
            } else if (paramIsValidProjectId) {
              projectId = paramId
            } else {
              projectId = determineProjectIdByStatus(verifiedAuthUser)
            }

            if (domain === 'project' && paramId !== projectId) {
              navigate(`/project/${projectId}`, { replace: true })
            }
            await dispatch(fetchAndStoreUserProject(projectId))
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
  }, [authUser._id, dispatch, location.pathname, navigate])

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

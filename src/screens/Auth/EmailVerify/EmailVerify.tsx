import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateAuthUser } from 'utils/redux/slices/userSlice'
import './EmailVerify.scss'
import { api } from 'utils/api/apiConfig'

export const EmailVerify = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id: userId, token: emailToken } = useParams()
  const replaceUrl = path => navigate(path, { replace: true })
  const pathInfo = useLocation()

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const { data } = await api.get(`/${userId}/verify/${emailToken}`)
        const { bootcamprNewToken, user } = data
        if (data.isExpired) {
          return replaceUrl(`/users/${userId}/expired-link`)
        }

        if (pathInfo.search.length > 0) {
          console.log(pathInfo)
          // update newEmail in backend
          const decodedEmail = atob(pathInfo.search.slice(1))
          const updatedEmail = await api.post(`/users/${userId}`, {
            email: decodedEmail,
          })
          console.log(updatedEmail)
          // if successful:
          return replaceUrl(`/sign-in${pathInfo.search}`)
        }

        if (bootcamprNewToken && user._id) {
          localStorage.setItem('bootcamprAuthToken', bootcamprNewToken)
          dispatch(updateAuthUser(user))
        } else {
          throw Error('Verification request missing user object or token')
        }

        if (user.onboarded === false) {
          replaceUrl(`/onboarding/${userId}`)
          return
        } else {
          // Might be good to replace with user profile
          replaceUrl('/')
        }
      } catch (error) {
        console.log(error)
        // Todo: route user to sign-up with error message state
        replaceUrl('/sign-up')
      }
    }
    verifyEmail()
  }, [userId, emailToken])

  return null
}

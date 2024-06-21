import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateAuthUser } from 'utils/redux/slices/userSlice'
import './EmailVerify.scss'
import { api } from 'utils/api/apiConfig'
import { logOut } from 'utils/api'

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
        localStorage.setItem('bootcamprAuthToken', bootcamprNewToken)

        if (data.isExpired) {
          const encodedEmail = pathInfo.search.slice(1)
          const appendUpdatedEmail = `?${encodedEmail}`

          return replaceUrl(
            `/users/${userId}/expired-link${appendUpdatedEmail}`
          )
        }

        if (pathInfo.search.length > 0) {
          let redirectURL

          // attempt to update newEmail in backend
          const decodedEmail = atob(pathInfo.search.slice(1))

          const resp = await api.post(`/users/${userId}`, {
            email: decodedEmail,
          })

          if (resp.status === 200) {
            redirectURL = `/sign-in${pathInfo.search}`
          } else {
            redirectURL = `/sign-in${pathInfo.search}&status=FAIL`
          }
          return replaceUrl(redirectURL)
        }

        replaceUrl('/sign-in')
      } catch (error) {
        console.log(error)
        // Todo: route user to sign-up with error message state
        replaceUrl('/sign-up')
      }
    }
    verifyEmail()
    logOut()
  }, [userId, emailToken])

  return null
}

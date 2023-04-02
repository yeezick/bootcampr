import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateAuthUser } from 'utils/redux/slices/userSlice'
import './EmailVerify.scss'
import { api } from 'utils/api/apiConfig'

export const EmailVerify = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id: userId, token: emailToken } = useParams()

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const { data } = await api.get(`/${userId}/verify/${emailToken}`)
        if (data.isExpired) {
          return navigate(`/users/${userId}/expired-link`)
        }

        const { bootcamprNewToken, user } = data
        localStorage.setItem('bootcamprAuthToken', bootcamprNewToken)
        dispatch(updateAuthUser(user))

        if (user.onboarded === false) {
          navigate('/users/onboarding')
          return
        }
      } catch (error) {
        console.log(error)
        // Todo: route user to sign-up with error message state
        navigate('/sign-up')
      }
    }
    verifyEmail()
  }, [userId, emailToken])

  return null
}

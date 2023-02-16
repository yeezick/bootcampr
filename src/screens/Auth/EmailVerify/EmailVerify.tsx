import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './EmailVerify.scss'
import { api } from 'utilities/api/apiConfig'

export const EmailVerify = () => {
  const navigate = useNavigate()
  const { id: userId, token: emailToken } = useParams()

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const { data } = await api.get(`/${userId}/verify/${emailToken}`)

        if (data.isExpired) {
          return navigate(`/users/${userId}/expired-link`)
        }
        navigate(`/sign-in`, {
          state: { status: 200, success: true, message: data.msg },
        })
      } catch (error) {
        console.log(error)
        navigate('/sign-up')
      }
    }
    verifyEmail()
  }, [userId, emailToken])

  return null
}

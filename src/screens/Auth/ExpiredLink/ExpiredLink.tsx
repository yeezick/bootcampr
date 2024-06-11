import { useLocation, useParams } from 'react-router-dom'
import { api } from 'utils/api/apiConfig'
import { TbRefreshAlert } from 'react-icons/tb'
import './ExpiredLink.scss'
import { useDispatch } from 'react-redux'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'
import { PrimaryButton } from 'components/Buttons'

export const ExpiredLink = () => {
  const dispatch = useDispatch()
  const { id: userId } = useParams()
  const pathInfo = useLocation()

  const handleNewLink = async (e: any) => {
    e.preventDefault()
    const encodedEmail = pathInfo.search.slice(1)
    const appendUpdateEmail = `?${encodedEmail}`
    const res: any = await api.post(
      `/users/${userId}/expired-link${appendUpdateEmail}`
    )
    const severity = res.status >= 400 ? 'error' : 'success'

    dispatch(
      createSnackBar({
        message: res.data.friendlyMessage,
        severity,
      })
    )
  }

  return (
    <div>
      <div className='expired-link-page'>
        <h1>Email verification link expired</h1>
        <div className='contents'>
          <p>
            The link we sent by email to confirm your email address has expired.
          </p>
          <p>
            We can resend the link so you can verify your email address and log
            in.
          </p>
        </div>
        <PrimaryButton
          label='Resend verification link'
          onClick={handleNewLink}
        />
      </div>
    </div>
  )
}

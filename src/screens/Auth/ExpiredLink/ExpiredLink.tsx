import { useLocation, useParams } from 'react-router-dom'
import { api } from 'utils/api/apiConfig'
import { TbRefreshAlert } from 'react-icons/tb'
import './ExpiredLink.scss'
import { useDispatch } from 'react-redux'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'

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
      <div className='expired-page'>
        <div className='expired-link-grid'>
          <span className='expired-logo'>
            <TbRefreshAlert />
          </span>
          <h1>Email verification link expired</h1>
          <p>
            Looks like the verification link has expired. Not to worry, we can
            send the link again.
          </p>
          <button onClick={handleNewLink}>Resend verification link</button>
        </div>
      </div>
    </div>
  )
}

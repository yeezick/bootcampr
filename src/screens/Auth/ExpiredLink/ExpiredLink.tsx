import { useParams } from 'react-router-dom'
import { api } from 'utilities/api/apiConfig'
import { FaInfoCircle } from 'react-icons/fa'
import { TbRefreshAlert } from 'react-icons/tb'
import { useState } from 'react'
import './ExpiredLink.scss'
import { AlertBanners } from 'utilities/types/AccountSettingsInterface'

export const ExpiredLink = () => {
  const { id: userId } = useParams()
  const [alertBanner, setAlertBanner] = useState<AlertBanners>({
    status: false,
    text: '',
  })

  const handleNewLink = async (e: any) => {
    e.preventDefault()
    const res: any = await api.post(`/users/${userId}/expired-link`)

    if (res.status === 200) {
      setAlertBanner({
        status: true,
        text: res.data.message,
        icon: <FaInfoCircle />,
        type: 'info',
      })

      setTimeout(() => {
        setAlertBanner({ status: false })
      }, 10000)
    }
  }

  return (
    <div>
      {alertBanner.status ? (
        <div className={alertBanner.type}>
          {alertBanner.icon}
          <p>{alertBanner.text}</p>
        </div>
      ) : (
        ''
      )}
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

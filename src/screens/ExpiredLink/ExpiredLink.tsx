import { useParams } from "react-router-dom"
import { api } from "../../utilities/api/apiConfig"
import { GoAlert } from 'react-icons/go';
import { TbRefreshAlert } from 'react-icons/tb'
import { useEffect, useState } from "react";
import './ExpiredLink.scss';

export const ExpiredLink = () => {
  const { id: userId } = useParams()
  const [alertBanner, setAlertBanner] = useState<any>({ status: false, txt: '' })

  const handleNewLink = async (e:any) => {
    e.preventDefault()
    const res:any = await api.post(`/users/${userId}/expired-link`)
    console.log('expired RES', res)

    if (res.status === 200) {
      setAlertBanner({ status: true, txt: res.data.message })

      setTimeout(() => {
        setAlertBanner({ status: false })
      }, 10000);
    }
  }

  return (
    <div>
      {alertBanner.status ? (
          <div className='alert-banner-resend'>
            <GoAlert />
            <p>{alertBanner.txt}</p>
          </div>
        ) : ''
      }
      <div className="expired-page">
        <div className="expired-link-grid">
          <span className="expired-logo"><TbRefreshAlert /></span>
          <h1>Email verification link expired</h1>
          <p>Looks like the verification link has expired. Not to worry, we can send the link again.</p>
          <button onClick={handleNewLink}>Resend verification link</button>
        </div>
      </div>
    </div>
  )
}
import './Settings.scss'
import { useEffect, useState } from 'react'
import { Account } from './Account'
import { Email } from './Email'
import { PasswordSettings } from './Password'
import { SideMenu } from 'components/SideMenu/SideMenu'
import { useLocation } from 'react-router-dom'

export const Settings = () => {
  const pathInfo = useLocation()
  const [settingsComponent, setSettingsComponent] = useState('email')

  useEffect(() => {
    const { pathname } = pathInfo
    const pathArr = pathname.split('/')
    const screen = pathArr[pathArr.length - 1]
    setSettingsComponent(screen)
  })

  return (
    <div className='settings-dock'>
      <SideMenu title={'Settings'} items={['Email', 'Password', 'Account']} />
      <div>
        {settingsComponent === 'email' && <Email />}
        {settingsComponent === 'password' && <PasswordSettings />}
        {settingsComponent === 'account' && <Account />}
      </div>
    </div>
  )
}

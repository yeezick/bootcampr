import { useEffect, useState } from 'react'
import Account from './Account'
import Email from './Email'
import Password from './Password'
import './Settings.scss'
import { SideMenu } from 'components/SideMenu/SideMenu'
import { useLocation } from 'react-router-dom'

export const Settings = () => {
  const pathInfo = useLocation()
  const [settingsComponent, setSettingsComponent] = useState('Email')

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
        {settingsComponent === 'Email' && <Email />}
        {settingsComponent === 'Password' && <Password />}
        {settingsComponent === 'Account' && <Account />}
      </div>
    </div>
  )
}

// move this to another components file or something so other screens can use it

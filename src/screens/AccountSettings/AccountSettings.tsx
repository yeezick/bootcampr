import { useState, useEffect } from 'react'
import styles from './AccountSettings.module.css'
import { initialState, AccountSettingsProps, DropDownSettings, settings } from './helper/data'


const AccountSettings = ({ }: AccountSettingsProps): JSX.Element => {
  // State Variables
  const [activeDropdown, setActiveDropdown] = useState<DropDownSettings>(initialState)

  // Event Handlers
  const handleOpenDropDown = (setting: string) => {
    // console.log(activeDropdown[setting])
    // setActiveDropdown({ ...activeDropdown, [setting]: !activeDropdown[setting] })
  }

  // JSX
  return (
    <div className={styles.account_settings_container}>
      {settings.map(({ title, val }) => (
        <div className={styles.update_container}>
          <div className={styles.setting_name}>
            <p>Update {title}</p>
            <button
              onClick={() => handleOpenDropDown(val)}
              className={styles.arrow}>
              &#9002;
            </button>
          </div>
        </div>
      ))}

      {/* <div className={styles.email_update_container}>
        <div className={styles.setting_name}>
          <p>Update Email</p>
          <button
            onClick={() => handleOpenDropDown('Email')}
            className={styles.arrow}>
            &#9002;
          </button>
        </div>
      </div>

      <div className={styles.password_update_container}>
        <div className={styles.setting_name}>
          <p>Update Password</p>
          <button className={styles.arrow}>&#9002;</button>
        </div>
      </div> */}
    </div>
  )
}

export default AccountSettings;
import { useState } from 'react'
import styles from './AccountSettings.module.css'
import { initialState, AccountSettingsProps, DropDownSettings, settings } from './helper/data'


const AccountSettings = ({ }: AccountSettingsProps): JSX.Element => {
  // State Variables
  const [activeDropdown, setActiveDropdown] = useState<DropDownSettings>(initialState)

  // Event Handlers
  const handleOpenDropDown = (setting: string) => {
    let newActiveDropdown = { ...activeDropdown }

    for (let key in activeDropdown) {
      if (key === setting) {
        if (newActiveDropdown[key as keyof DropDownSettings] === true) newActiveDropdown[key as keyof DropDownSettings] = false
        else newActiveDropdown[key as keyof DropDownSettings] = true
      }
      else newActiveDropdown[key as keyof DropDownSettings] = false
    }

    setActiveDropdown(newActiveDropdown)
  }

  // JSX
  return (
    <div className={styles.account_settings_container}>
      {settings.map(({ title, val, Component, props }) => (
        <div key={val} className={styles.update_container}>
          <div className={styles.setting_name}>
            <p>Update {title}</p>

            <button
              onClick={() => handleOpenDropDown(val)}
              className={`${activeDropdown[val as keyof DropDownSettings] ? styles.arrow : styles.active_arrow}`}>
              &#9002;
            </button>

            {
              activeDropdown[val as keyof DropDownSettings]
              &&
              < Component {...props} />
            }
          </div>
        </div>
      ))}
    </div>
  )
}

export default AccountSettings;
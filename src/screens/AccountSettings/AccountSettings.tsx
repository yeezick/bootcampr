import { useState } from 'react'
import { initialState, settings } from './helper/data'
import { DropDownSettings, AccountSettingsProps } from '../../utilities/types/AccountSettingsInterface'
import styles from './AccountSettings.module.css'


const AccountSettings = ({ }: AccountSettingsProps): JSX.Element => {
  // State Variables
  const [dropdownModes, setDropdownModes] = useState<DropDownSettings>(initialState)



  // Helper Functions
  const closeDropdown = (key: string, tempModes: DropDownSettings) => tempModes[key as keyof DropDownSettings] = false
  const openDropdown = (key: string, tempModes: DropDownSettings) => tempModes[key as keyof DropDownSettings] = true

  // Event Handlers
  const handleToggleDropdown = (setting: string) => {
    const tempModes = { ...dropdownModes }

    for (let key in dropdownModes) {
      const settingWasClickedOn: boolean = key === setting
      const theDropdownIsAlreadyOpen: boolean = tempModes[key as keyof DropDownSettings] === true

      if (settingWasClickedOn) theDropdownIsAlreadyOpen ? closeDropdown(key, tempModes) : openDropdown(key, tempModes)
      else closeDropdown(key, tempModes)
    }

    setDropdownModes(tempModes)
  }

  // JSX
  return (
    <div className={styles.account_settings_container}>
      {settings.map(({ title, val, Component, props }) => (
        <div key={val} className={styles.update_container}>
          <div className={styles.setting_name}>
            <p>Update {title}</p>

            <button
              onClick={() => handleToggleDropdown(val)}
              className={`${dropdownModes[val as keyof DropDownSettings] ? styles.arrow : styles.active_arrow}`}>
              &#9002;
            </button>
            {
              dropdownModes[val as keyof DropDownSettings]
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
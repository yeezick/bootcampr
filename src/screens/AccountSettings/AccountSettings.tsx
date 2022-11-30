import { AccountSettingsProps, DropDownSettings } from '../../utilities/types/AccountSettingsInterface'
import { initialDropdownState, settings } from './helper/data'

import { DropdownToggleButton } from './components/DropdownToggleButton'
import styles from './css/AccountSettings.module.css'
import { useState } from 'react'

export const AccountSettings = ({ }: AccountSettingsProps): JSX.Element => {
  // State Variables
  const [dropdownModes, setDropdownModes] = useState<DropDownSettings>(initialDropdownState) // determines wether the dropdown is open or not

  // Constants
  const dropdownOpen = (val: string) => dropdownModes[val as keyof DropDownSettings]

  // JSX
  return (
    <div className={styles.account_settings_container}>

      {settings.map(({ title, val, Component, props }) => (

        <div key={val} className={styles.update_container}>
          <div className={styles.setting_name}>
            <p>Update {title}</p>

            <DropdownToggleButton
              active={dropdownOpen(val)}
              setting={val}
              tempModes={{ ...dropdownModes }}
              dropdownModes={dropdownModes}
              setDropdownModes={setDropdownModes} />

            {dropdownModes[val as keyof DropDownSettings] && < Component {...props} />}

          </div>
        </div>

      ))}

    </div>
  )
}

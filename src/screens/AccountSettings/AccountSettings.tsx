import { DropDownSettings } from 'utilities/types/AccountSettingsInterface'
import { initialDropdownState, settings } from './helper/data'
import { DropdownToggleButton } from './components/DropdownToggleButton'
import styles from './css/AccountSettings.module.css'
import { useState } from 'react'

export const AccountSettings = (): JSX.Element => {
  // State Variables
  const [dropdownModes, setDropdownModes] =
    useState<DropDownSettings>(initialDropdownState) // determines wether the dropdown is open or not

  // Constants
  const dropdownOpen = (val: string) =>
    dropdownModes[val as keyof DropDownSettings]

  // JSX
  return (
    <div className={styles['account-settings-container']}>
      {' '}
      //
      {settings.map(({ title, val, Component, props }) => (
        <div key={val} className={styles['update-container']}>
          <div className={styles['setting-name']}>
            <p>Update {title}</p>

            <DropdownToggleButton
              active={dropdownOpen(val)}
              setting={val}
              tempModes={{ ...dropdownModes }}
              dropdownModes={dropdownModes}
              setDropdownModes={setDropdownModes}
            />

            {dropdownModes[val as keyof DropDownSettings] && (
              <Component {...props} />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

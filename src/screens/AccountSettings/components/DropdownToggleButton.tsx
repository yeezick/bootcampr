import { DropdownToggleButtonProps } from 'utilities/types/AccountSettingsInterface'
import { handleToggleDropdown } from '../helper/dropdownHelpers'
import styles from '../css/AccountSettings.module.css'

export const DropdownToggleButton = ({
  active,
  setting,
  tempModes,
  dropdownModes,
  setDropdownModes,
}: DropdownToggleButtonProps) => {
  return (
    <div
      onClick={() =>
        handleToggleDropdown({
          setting,
          tempModes,
          dropdownModes,
          setDropdownModes,
        })
      }
    >
      <button className={active ? styles['active-arrow'] : styles['arrow']}>
        &#9002;
      </button>
    </div>
  )
}

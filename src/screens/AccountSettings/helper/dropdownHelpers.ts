import { DropDownSettings } from 'utilities/types/AccountSettingsInterface'
import { ToggleDropdown } from 'utilities/types/AccountSettingsInterface'

export const closeDropdown = (key: string, tempModes: DropDownSettings) =>
  (tempModes[key as keyof DropDownSettings] = false)
export const openDropdown = (key: string, tempModes: DropDownSettings) =>
  (tempModes[key as keyof DropDownSettings] = true)

export const handleToggleDropdown = ({
  setting,
  tempModes,
  dropdownModes,
  setDropdownModes,
}: ToggleDropdown) => {
  for (let key in dropdownModes) {
    const settingWasClickedOn: boolean = key === setting
    const theDropdownIsAlreadyOpen: boolean =
      tempModes[key as keyof DropDownSettings] === true

    if (!settingWasClickedOn) closeDropdown(key, tempModes)
    else
      theDropdownIsAlreadyOpen
        ? closeDropdown(key, tempModes)
        : openDropdown(key, tempModes)
  }

  setDropdownModes(tempModes)
}

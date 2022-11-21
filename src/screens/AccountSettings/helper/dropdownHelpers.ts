import { DropDownSettings } from '../../../utilities/types/AccountSettingsInterface';

export const closeDropdown = (key: string, tempModes: DropDownSettings) => tempModes[key as keyof DropDownSettings] = false
export const openDropdown = (key: string, tempModes: DropDownSettings) => tempModes[key as keyof DropDownSettings] = true


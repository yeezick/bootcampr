import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { DomainStrings, SideMenuIconMapInterface } from 'interfaces'
import { Dispatch } from 'react'
import { NavigateFunction } from 'react-router-dom'
import {
  resetSideMenu,
  setSideMenu,
} from 'utils/redux/slices/userInterfaceSlice'
import { RootState } from 'utils/redux/store'

/**
 * Builds the metadata for each link that renders in the Project Portal sidemenu.
 * @param userId
 * @returns {SideMenuInterface} Context for Project Portal sidemenu
 */
export const buildProjectPortalLinks = (projectId: string) => [
  {
    domain: 'project',
    icon: 'description',
    label: 'Project Details',
    route: `/project/${projectId}`,
  },
  {
    domain: 'project',
    icon: 'group',
    label: 'Team',
    route: `/project/${projectId}/team`,
  },
  {
    domain: 'project',
    icon: 'calendar',
    label: 'Calendar',
    route: `/project/${projectId}/calendar`,
  },
  {
    domain: 'project',
    icon: 'tasks',
    label: 'Task Management',
    route: `/project/${projectId}/tasks`,
  },
]

/**
 * Builds the metadata for each link that renders in the Settings sidemenu.
 * @param userId
 * @returns {SideMenuInterface} Context for Settings sidemenu
 */
export const buildSettingsPortalLinks = (userId: string) => [
  {
    domain: 'settings',
    icon: 'email',
    label: 'Email',
    route: `/users/${userId}/settings/email`,
  },
  {
    domain: 'settings',
    icon: 'lock',
    label: 'Password',
    route: `/users/${userId}/settings/password`,
  },
  {
    domain: 'settings',
    icon: 'account',
    label: 'Account',
    route: `/users/${userId}/settings/account`,
  },
]

/**
 * Builds the redux object for the Settings sidemenu.
 * @param projectId
 * @returns {SideMenuInterface} Context for settings sidemenu
 */
export const buildSettingsSideMenu = (projectId: string) => {
  return {
    active: true,
    links: buildSettingsPortalLinks(projectId),
    title: 'Settings',
  }
}

/**
 * Builds the redux object for the Project Portal sidemenu.
 * @param projectId
 * @returns {SideMenuInterface} Context for Project Portal sidemenu
 */
export const buildProjectPortalSideMenu = (projectId: string) => {
  return {
    active: true,
    links: buildProjectPortalLinks(projectId),
    title: 'Project Portal',
  }
}

/**
 * Dispatches side menu state based on type of domain.
 * @param dispatch Instantiated dispatcher
 * @param domain Type of domain: "project" | "settings"
 * @param projectId
 */
export const determineSideMenu = (
  dispatch: ThunkDispatch<RootState, undefined, AnyAction> &
    Dispatch<AnyAction>,
  domain: DomainStrings,
  projectId: string
) => {
  if (domain === 'project') {
    dispatch(setSideMenu(buildProjectPortalSideMenu(projectId)))
  } else if (domain === 'settings') {
    dispatch(setSideMenu(buildSettingsSideMenu(projectId)))
  } else {
    dispatch(resetSideMenu())
  }
}

/**
 * Simply adds domain to Location state when routing user. Required for SideMenu usage.
 * @param navigate Callback returned from useNavigate()
 * @param route URL for user routing
 * @param domain Type of domain: "project" | "settings"
 */
export const navigateToDomain = (
  navigate: NavigateFunction,
  route: string,
  domain: DomainStrings
) => navigate(route, { state: { domain } })

export const sideMenuIconMap: SideMenuIconMapInterface = {
  account: AccountCircleOutlinedIcon,
  calendar: CalendarTodayOutlinedIcon,
  description: DescriptionOutlinedIcon,
  email: EmailOutlinedIcon,
  group: GroupsOutlinedIcon,
  lock: LockOutlinedIcon,
  tasks: ChecklistOutlinedIcon,
}

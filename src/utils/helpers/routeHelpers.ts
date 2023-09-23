import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

export const navigateToDomain = (navigate, route, domain) =>
  navigate(route, { state: { domain } })

export const sideMenuIconMap = {
  account: AccountCircleOutlinedIcon,
  calendar: CalendarTodayOutlinedIcon,
  description: DescriptionOutlinedIcon,
  email: EmailOutlinedIcon,
  group: GroupsOutlinedIcon,
  lock: LockOutlinedIcon,
  tasks: ChecklistOutlinedIcon,
}

export const buildProjectPortalLinks = (userId, projectId) => [
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

export const buildSettingsPortalLinks = userId => [
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
export const buildSideMenu = (type, userId, project) => {
  let finalSideMenu = { active: true, links: [], title: '' }
  if (type === 'project') {
    finalSideMenu = {
      ...finalSideMenu,
      links: buildProjectPortalLinks(userId, project),
      title: 'Project Portal',
    }
  } else if (type === 'settings') {
    finalSideMenu = {
      ...finalSideMenu,
      links: buildSettingsPortalLinks(project),
      title: 'Settings',
    }
  }
  return finalSideMenu
}

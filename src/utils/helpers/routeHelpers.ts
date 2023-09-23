export const navigateToDomain = (navigate, route, domain) =>
  navigate(route, { state: { domain } })

export const buildProjectPortalLinks = (userId, projectId) => [
  {
    label: 'My Profile',
    route: `/users/${userId}`,
  },
  {
    label: 'Calendar',
    route: `/project/${projectId}/calendar`,
    domain: 'project',
  },
  {
    label: 'Sign Out',
    route: `/`,
  },
]

export const buildSettingsPortalLinks = userId => [
  {
    domain: 'settings',
    label: 'Email',
    route: `/users/${userId}/settings/email`,
  },
  {
    domain: 'settings',

    label: 'Password',
    route: `/users/${userId}/settings/password`,
  },
  {
    domain: 'settings',
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

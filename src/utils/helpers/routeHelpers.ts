export const navigateToDomain = (navigate, route, domain) =>
  navigate(route, { state: { domain } })

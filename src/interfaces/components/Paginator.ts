export interface NavigationState {
  currentPage: object
  navigate?: Function
  pageRouter: object
  specificPageId?: string
}

export interface PageItem {
  component: React.ComponentType
  id: string
  location: {
    next: string | null
    previous: string | null
  }
  title: string
}

export interface PageRouter {
  allPages: { [index: string]: PageItem }
  currentPageId: string
  exitRoute: string
  paginatorId: string
}

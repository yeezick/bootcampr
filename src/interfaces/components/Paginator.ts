import { ComponentType } from 'react'

export interface NavigationState {
  currentPage: object
  navigate?: Function
  pageRouter: object
  specificPageId?: string
}

export interface PageItem {
  component: ComponentType<CurrentPageProps>
  id: string
  location: {
    next: string | null
    previous: string | null
  }
  title: string
  props?: object
}

interface CurrentPageProps {
  handlePageNavigation: (
    type: 'next' | 'previous' | 'specific',
    specificPageId?: string
  ) => void
  [key: string]: any // allow for any other dynamic prop
}

export interface PageRouter {
  allPages: { [index: string]: PageItem }
  currentPageId: string
  exitRoute: string
}

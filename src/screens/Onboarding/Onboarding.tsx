import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  handleNextPage,
  handlePreviousPage,
  handleSpecificPage,
} from 'utils/components/PaginatorUtils'
import './paginator.scss'

export const Onboarding = () => {
  const [currentPage, setCurrentPage] = useState({
    component: null,
    id: 'one',
    location: {
      next: 'two',
      previous: null,
    },
    title: 'One',
    props: null,
  })
  const [pageRouter, setPageRouter] = useState({
    currentPageId: 'one',
    exitRoute: '/',
    allPages: {
      one: {
        component: null,
        id: 'one',
        location: {
          next: 'two',
          previous: null,
        },
        title: 'One',
        props: null,
      },
      two: {
        component: null,
        id: 'two',
        location: {
          next: 'three',
          previous: 'one',
        },
        title: 'Two',
        props: null,
      },
      three: {
        component: null,
        id: 'three',
        location: {
          next: null,
          previous: 'two',
        },
        title: 'Three',
        props: null,
      },
    },
  })

  /**
   *
   * @param type Str - options: next, previous, specific
   */
  interface NavigationState {
    currentPage: object
    navigate?: Function
    pageRouter: object
    specificPageId?: string
  }

  const handlePageNavigation = (type, specificPageId?) => {
    const pageHandlers = { setCurrentPage, setPageRouter }
    let pageProps: NavigationState = { currentPage, pageRouter }
    if (type === 'next') {
      pageProps.navigate = useNavigate()
      handleNextPage(pageHandlers, pageProps)
    } else if (type === 'previous') {
      handlePreviousPage(pageHandlers, pageProps)
    } else if (type === 'specific') {
      pageProps.specificPageId = specificPageId
      console.log(pageProps)
      handleSpecificPage(pageHandlers, pageProps)
    }
  }

  return (
    <div>
      {Object.keys(pageRouter.allPages).map(pageTitle => (
        <PageBar
          title={pageTitle}
          handlePageNavigation={handlePageNavigation}
          currentPageId={currentPage.id}
        />
      ))}
      Onboarding
    </div>
  )
}

const PageBar = ({ title, currentPageId, handlePageNavigation }) => {
  const currentPage = title === currentPageId
  return (
    <div
      className={currentPage && 'selected-page'}
      onClick={() => handlePageNavigation('specific', title)}
    >
      {title}
    </div>
  )
}

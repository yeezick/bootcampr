import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  buildPage,
  convertTitleToId,
  handleNextPage,
  handlePreviousPage,
  handleSpecificPage,
} from 'utils/components/PaginatorUtils'
import {
  initialCurrentPage,
  initialPageRouter,
} from '__tests__/__mocks__/components/paginator'
import { NavigationState, PageRouter } from 'interfaces/components/Paginator'
import './paginator.scss'

export const Paginator = ({ exitRoute, orderedPages, pageTitle }) => {
  const [currentPage, setCurrentPage] = useState(initialCurrentPage)
  const [pageRouter, setPageRouter] = useState<PageRouter>(initialPageRouter)

  useEffect(() => {
    const buildPageRouter = (): PageRouter => {
      const allPages = {}

      for (let i = 0; i < orderedPages.length; i++) {
        let newPage = orderedPages[i]
        const newPageId = convertTitleToId(newPage.title)
        let nextPage = orderedPages[i + 1]
        let previousPage = orderedPages[i - 1]

        allPages[newPageId] = buildPage(newPage, nextPage, previousPage)
      }

      return {
        allPages,
        currentPageId: pageRouter.currentPageId,
        exitRoute,
        paginatorId: convertTitleToId(pageTitle),
      }
    }

    const updatedPageRouter = buildPageRouter()
    setPageRouter(updatedPageRouter)
  }, [orderedPages])

  /**
   *  @param type Str - [next, previous, specific]
   */
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
      handleSpecificPage(pageHandlers, pageProps)
    } else {
      console.error(`Invalid navigation type given: ${type}`)
      return
    }
  }

  return (
    <div className='paginator'>
      <h2>{pageTitle}</h2>
      <PageBar
        currentPageId={currentPage.id}
        handlePageNavigation={handlePageNavigation}
        allPages={pageRouter.allPages}
      />
    </div>
  )
}

const PageBar = ({ currentPageId, handlePageNavigation, allPages }) => {
  return (
    <div className='page-bar'>
      {Object.keys(allPages).map(pageTitle => (
        <PageBarItem
          page={allPages[pageTitle]}
          handlePageNavigation={handlePageNavigation}
          currentPageId={currentPageId}
        />
      ))}
    </div>
  )
}

const PageBarItem = ({ page, currentPageId, handlePageNavigation }) => {
  const { title } = page
  const pageId = convertTitleToId(title)
  const isCurrentPage = pageId === currentPageId
  const classNames = `page-bar-item ${isCurrentPage && 'current-page'}`
  return (
    <div
      className={classNames}
      onClick={() => handlePageNavigation('specific', pageId)}
    >
      {title}
    </div>
  )
}

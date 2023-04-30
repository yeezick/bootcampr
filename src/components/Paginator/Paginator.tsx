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
import {
  NavigationState,
  PageItem,
  PageRouter,
} from 'interfaces/components/Paginator'
import './paginator.scss'

export const Paginator = ({ exitRoute, orderedPages, pageTitle }) => {
  const [currentPage, setCurrentPage] = useState<PageItem>(initialCurrentPage)
  const [pageRouter, setPageRouter] = useState<PageRouter>(initialPageRouter)
  const { component: CurrentPageComponent, props: currentPageProps } =
    currentPage

  useEffect(() => {
    const buildPageRouter = (): PageRouter => {
      const allPages = {}

      for (let i = 0; i < orderedPages.length; i++) {
        let newPage = orderedPages[i]
        const newPageId = convertTitleToId(newPage.title)
        let nextPage = orderedPages[i + 1]
        let previousPage = orderedPages[i - 1]
        allPages[newPageId] = buildPage(newPage, nextPage, previousPage)
        if (i === 0) setCurrentPage(allPages[newPageId]) // if this is the first page, set it as the current
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

  const handlePageNavigation = (
    type: 'next' | 'previous' | 'specific',
    specificPageId?: string
  ) => {
    const pageHandlers = { setCurrentPage, setPageRouter }
    let pageProps: NavigationState = { currentPage, pageRouter }
    if (type === 'next') {
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
      <article className='current-page-wrapper'>
        {CurrentPageComponent && (
          <CurrentPageComponent
            {...currentPageProps}
            handlePageNavigation={handlePageNavigation}
          />
        )}
      </article>
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
  const classNames = `page-bar-item ${isCurrentPage && 'current-page-bar-item'}`
  return (
    <div
      className={classNames}
      onClick={() => handlePageNavigation('specific', pageId)}
    >
      {title}
    </div>
  )
}

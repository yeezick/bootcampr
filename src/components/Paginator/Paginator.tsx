import { useEffect, useState } from 'react'
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
import { useSearchParams } from 'react-router-dom'
import './paginator.scss'

export const Paginator = ({
  exitRoute,
  orderedPages,
  manualNavigationAllowed,
}) => {
  const [currentPage, setCurrentPage] = useState<PageItem>(initialCurrentPage)
  const [pageRouter, setPageRouter] = useState<PageRouter>(initialPageRouter)
  const [searchParams, setSearchParams] = useSearchParams()
  const { component: CurrentPageComponent, props: currentPageProps } =
    currentPage

  useEffect(() => {
    const buildPageRouter = (): PageRouter => {
      const allPages = {}
      let firstPageId: string

      for (let i = 0; i < orderedPages.length; i++) {
        let newPage = orderedPages[i]
        const newPageId = convertTitleToId(newPage.title)
        let nextPage = orderedPages[i + 1]
        let previousPage = orderedPages[i - 1]
        allPages[newPageId] = buildPage(newPage, nextPage, previousPage)
        if (i === 0) firstPageId = newPageId
      }

      const urlPageId = searchParams.get('pageId')
      if (urlPageId && Object.keys(allPages).includes(urlPageId)) {
        setCurrentPage(allPages[urlPageId])
      } else {
        setCurrentPage(allPages[firstPageId])
      }

      return {
        allPages,
        currentPageId: pageRouter.currentPageId,
        exitRoute,
      }
    }

    const updatedPageRouter = buildPageRouter()
    setPageRouter(updatedPageRouter)
  }, [orderedPages])

  const handlePageNavigation = (
    type: 'next' | 'previous' | 'specific',
    specificPageId?: string
  ) => {
    const pageHandlers = { setCurrentPage, setPageRouter, setSearchParams }
    let pageProps: NavigationState = { currentPage, pageRouter }
    if (type === 'next') {
      handleNextPage(pageHandlers, pageProps)
    } else if (type === 'previous') {
      handlePreviousPage(pageHandlers, pageProps)
    } else if (type === 'specific' && manualNavigationAllowed) {
      pageProps.specificPageId = specificPageId
      handleSpecificPage(pageHandlers, pageProps)
    } else {
      console.error(`Invalid navigation type given: ${type}`)
      return
    }
  }

  return (
    <div className='paginator'>
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
          key={pageTitle}
          page={allPages[pageTitle]}
          handlePageNavigation={handlePageNavigation}
          currentPageId={currentPageId}
        />
      ))}
    </div>
  )
}

const PageBarItem = ({ page, currentPageId, handlePageNavigation }) => {
  const { completed, title } = page
  const pageId = convertTitleToId(title)
  const completedItem = pageId === currentPageId || completed
  const pageBarClassNames = `page-bar-item ${
    completedItem ? 'complete-page-bar-item' : 'incomplete-page-bar-item'
  }`
  return (
    <div
      className='page-bar-item-wrapper'
      onClick={() => handlePageNavigation('specific', pageId)}
      key={currentPageId}
    >
      <div className={pageBarClassNames}></div>
      <span>{title}</span>
    </div>
  )
}

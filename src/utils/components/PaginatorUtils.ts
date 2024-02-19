import { PageItem } from 'interfaces/components/Paginator'
import { produce } from 'immer'
import { useSearchParams } from 'react-router-dom'

/**
 *  Navigation Handlers
 */
export const handleSpecificPage = (pageHandlers, pageProps) => {
  const { setCurrentPage, setPageRouter, setSearchParams } = pageHandlers
  const { pageRouter, specificPageId } = pageProps
  const specificPage = pageRouter.allPages[specificPageId]

  if (!specificPageId) {
    // what should happen?
    // reject the action?
    console.log(`ERROR -- no specific page id: ${specificPageId}`)
    return
  }

  if (!specificPage) {
    // fall back to error case or 404
    console.log(`ERROR -- specific page does not exist: ${specificPage}`)
    return
  }

  setCurrentPage(specificPage)
  setPageRouter({ ...pageRouter, currentPageId: specificPageId })
  setSearchParams({ pageId: specificPageId })
}

export const handlePreviousPage = (pageHandlers, pageProps) => {
  const { setCurrentPage, setPageRouter, setSearchParams } = pageHandlers
  const { pageRouter, currentPage } = pageProps
  const previousPageId = currentPage.location.previous
  const previousPage = pageRouter.allPages[previousPageId]
  const updatedPageRouter = produce(draft => {
    draft.currentPageId = previousPageId
  })
  setCurrentPage(previousPage)
  setPageRouter(updatedPageRouter)
  setSearchParams({ pageId: previousPageId })
}

export const handleNextPage = (pageHandlers, pageProps) => {
  const { setCurrentPage, setPageRouter, setSearchParams } = pageHandlers
  const { currentPage, pageRouter } = pageProps
  const nextPageId = currentPage.location.next
  const nextPage = pageRouter.allPages[nextPageId]

  if (!nextPageId) {
    window.location.href = '/'
    return
  }

  const updatedPageRouter = produce(draft => {
    draft.allPages[currentPage.id].completed = true
    draft.currentPageId = nextPageId
  })

  setCurrentPage({ ...nextPage })
  setPageRouter(updatedPageRouter)
  setSearchParams({ pageId: nextPageId })
}

/**
 * Helper Functions
 */
export const addLocationsToPage = (nextPage, previousPage) => {
  return {
    next: nextPage ? convertTitleToId(nextPage.title) : null,
    previous: previousPage ? convertTitleToId(previousPage.title) : null,
  }
}

export const buildPage = (newPage, nextPage, previousPage): PageItem => {
  const newPageId = convertTitleToId(newPage.title)

  newPage = {
    ...newPage,
    id: newPageId,
    location: addLocationsToPage(nextPage, previousPage),
  }
  return newPage
}

export const convertTitleToId = title => {
  const cleanedTitle = title.replace(/['"’]/g, '').toLowerCase()

  if (cleanedTitle === cleanedTitle.toUpperCase()) {
    return cleanedTitle.toLowerCase()
  }

  const words = cleanedTitle.split(' ')
  const camelCaseWords = words.map((word, index) =>
    index === 0
      ? word.charAt(0).toLowerCase() + word.slice(1)
      : word.charAt(0).toUpperCase() + word.slice(1)
  )
  return camelCaseWords.join('')
}

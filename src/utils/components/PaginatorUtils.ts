import { PageItem } from 'interfaces/components/Paginator'
import { produce } from 'immer'

/**
 *  Navigation Handlers
 */
export const handleSpecificPage = (pageHandlers, pageProps) => {
  const { setCurrentPage, setPageRouter } = pageHandlers
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
}

export const handlePreviousPage = (pageHandlers, pageProps) => {
  const { setCurrentPage, setPageRouter } = pageHandlers
  const { pageRouter, currentPage } = pageProps
  const previousPageId = currentPage.location.previous
  const previousPage = pageRouter.allPages[previousPageId]
  const updatedPageRouter = produce(draft => {
    draft.currentPageId = previousPageId
  })

  setCurrentPage(previousPage)
  setPageRouter(updatedPageRouter)
}

export const handleNextPage = (pageHandlers, pageProps) => {
  const { setCurrentPage, setPageRouter } = pageHandlers
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
  let joinedTitle = title.split(' ')
  for (let i = 0; i < joinedTitle.length; i++) {
    let currWord = joinedTitle[i]
    if (i === 0) {
      joinedTitle[i] = currWord[0].toLowerCase() + currWord.slice(1)
    } else {
      joinedTitle[i] = currWord[0].toUpperCase() + currWord.slice(1)
    }
  }

  return joinedTitle.join('')
}

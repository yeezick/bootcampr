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

  if (!previousPageId || !previousPage) {
    // should honestly just disable the previous button
    // user should not have the option to go back on the first node
    console.log(`ERROR -- no previous page id: ${previousPageId}`)
    console.log(`ERROR -- no previous page: ${previousPage}`)
    return
  }

  setCurrentPage(previousPage)
  setPageRouter({ ...pageRouter, currentPageId: previousPageId })
}

export const handleNextPage = (pageHandlers, pageProps) => {
  const { setCurrentPage, setPageRouter } = pageHandlers
  const { currentPage, navigate, pageRouter } = pageProps
  const nextPageId = currentPage.location.next
  const nextPage = pageRouter.allPages[nextPageId]

  if (!nextPageId) {
    navigate(pageRouter.exitRoute)
    return
  }

  if (!nextPage) {
    console.log(`ERROR -- next node doesnt exist: ${nextPageId}`)
    return // should throw error and should never be the case
  }

  setCurrentPage(nextPage)
  setPageRouter({ ...pageRouter, currentPageId: nextPageId })
}

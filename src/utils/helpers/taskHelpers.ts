export const filterOutTickets = (allTickets, userId) => {
  const filteredTickets = {}
  for (const status in allTickets) {
    filteredTickets[status] = allTickets[status].filter(
      ticket => ticket.assignee === userId
    )
  }
  return filteredTickets
}

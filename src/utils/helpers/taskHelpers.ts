export const filterUserTickets = (allTickets, userId) => {
  const filteredTickets = {
    completed: [],
    inProgress: [],
    toDo: [],
    underReview: [],
  }

  for (const status in allTickets) {
    filteredTickets[status] = allTickets[status].filter(
      ticket => ticket.assignee === userId
    )
  }

  return filteredTickets
}

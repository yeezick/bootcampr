import {
  TaskBoardInterface,
  TicketFieldsInterface,
} from 'interfaces/TaskBoardInterface'

export const emptyTicketFields: TicketFieldsInterface = {
  assignee: 'Unassigned',
  comments: [],
  createdBy: '',
  description: '',
  dueDate: '',
  link: '',
  projectId: '',
  status: '',
  title: '',
}

export const initialTaskBoardState: TaskBoardInterface = {
  confirmationDialogType: '',
  displayAllTickets: true,
  ticketDialogState: '',
  ticketFields: emptyTicketFields,
  visibleTickets: {
    completed: [],
    inProgress: [],
    toDo: [],
    underReview: [],
  },
  visibleTicketDialog: false,
  conflictedTicket: {
    ticket: null,
    dialogState: '',
  },
  fetchComments: false,
}

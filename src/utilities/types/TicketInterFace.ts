import { UserInterface } from './UserInterface'
export interface ticketInterface {
  ticket: {
    id: string
    title: string
    type: string
    description: string
    assignees?: []
  }
}

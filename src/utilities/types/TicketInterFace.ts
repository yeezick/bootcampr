import { UserInterface } from './UserInterface'
export interface ticketInterface {
  id: string
  title: string
  type: string
  description: string
  assignees: [UserInterface]
}

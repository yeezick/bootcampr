import { CommentInterface } from './Comments'

export interface TicketInterface {
  assignee?: string
  comments?: CommentInterface[]
  createdAt?: string
  createdBy?: string
  description?: string
  dueDate?: string
  link?: string
  projectId?: string
  status?: string
  title?: string
  updatedAt?: string
  _v?: number
  _id?: string
}

export interface CommentInterface {
  author: {
    firstName: string
    lastName: string
    profilePicture: string
    userId: string
  }
  content: string
  likes: string[]
  isReply: boolean
  replies: string[]
}

export interface TaskInterface {
  assignee?: string
  comments?: CommentInterface[]
  createdBy?: string
  dueDate?: string
  description?: string
  image?: string
  link?: string
  projectId?: string
  status?: string
  title?: string
  _id?: string
}

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

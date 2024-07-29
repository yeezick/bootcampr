import { UserInterface } from './UserInterface'

export interface CommentProps {
  comment: CommentInterface
  isReply?: boolean
}

export interface CommentInterface {
  authorId: string
  createdAt: string
  content: string
  likes: string[]
  replies: ReplyInterface[]
}

export interface CommentSocketStateInterface {
  userId: string
  members: UserInterface[]
  currentProjectId: string
}

export interface ReplyInterface {
  _id: string
  likes: string[]
  content: string
  authorId: string
  createdAt: string
  updatedAt: string
  ticketId: string
  parentId: string
  __v: number
}
export interface NewCommentProps {
  parentCommentId?: string
}

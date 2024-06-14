export interface CommentProps {
  comment: CommentInterface
  fetchComments: boolean
  isReply?: boolean
  toggleFetchComments: React.Dispatch<React.SetStateAction<boolean>>
}

export interface CommentInterface {
  authorId: string
  createdAt: string
  content: string
  likes: string[]
  replies: ReplyInterface[]
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
  fetchComments: boolean
  parentCommentId?: string
  toggleFetchComments: React.Dispatch<React.SetStateAction<boolean>>
}

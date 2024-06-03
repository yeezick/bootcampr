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
  replies: string[]
}

export interface NewCommentProps {
  fetchComments: boolean
  parentCommentId?: string
  toggleFetchComments: React.Dispatch<React.SetStateAction<boolean>>
}

import { blankDayJs, generateHexadecimal } from 'utils/helpers'

export const emptyTicket = {
  id: '',
  title: '',
  type: '',
  description: '',
  assignees: [],
}

const sampleCommentId = generateHexadecimal()
const sampleReplyId = generateHexadecimal()
const sampleCommentDate = blankDayJs().format()
const sampleReplyDate = blankDayJs().add(1, 'hour').format()

export const sampleComment = [
  {
    _id: sampleCommentId,
    likes: [],
    content: 'This is a sample comment',
    authorId: 'sillyGoose',
    replies: [sampleReplyId],
    isReply: false,
    createdAt: sampleCommentDate,
    updatedAt: sampleCommentDate,
    __v: 0,
  },
]
export const sampleReply = [
  {
    _id: sampleReplyId,
    likes: ['sillyGoose'],
    content: 'This is a sample reply',
    authorId: 'starStruck',
    replies: [],
    isReply: true,
    createdAt: sampleReplyDate,
    updatedAt: sampleReplyDate,
    __v: 0,
  },
]

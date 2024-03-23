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
    author: {
      userId: 'sillyGoose',
      firstName: 'Silly',
      lastName: 'Goose',
      profilePicture: '', // TODO look into this
      _id: generateHexadecimal(), // Why is there an _id being returned for the author object? It's not a schema model in the DB
    },
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
    author: {
      userId: 'starStruck',
      firstName: 'Star',
      lastName: 'Struck',
      profilePicture: '',
      _id: generateHexadecimal(),
    },
    replies: [],
    isReply: true,
    createdAt: sampleReplyDate,
    updatedAt: sampleReplyDate,
    __v: 0,
  },
]

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
const sampleTicketId = '66551cc616071a6eb0beb998'

export const sampleReply = [
  {
    authorId: 'edwardEngineer',
    content: 'This is a sample reply',
    createdAt: sampleReplyDate,
    likes: ['danaDesigner'],
    ticketId: sampleTicketId,
    parentId: sampleCommentId,
    updatedAt: sampleReplyDate,
    _id: sampleReplyId,
    __v: 0,
  },
]

export const sampleComment = [
  {
    authorId: 'danaDesigner',
    content: 'This is a sample comment',
    createdAt: sampleCommentDate,
    likes: [],
    replies: sampleReply,
    ticketId: sampleTicketId,
    updatedAt: sampleCommentDate,
    _id: sampleCommentId,
    __v: 0,
  },
]

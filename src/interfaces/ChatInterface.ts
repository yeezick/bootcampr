export interface ChatSliceInterface {
  visibleChat: boolean
  _id: string
  isGroup: boolean
  participants: []
  displayName?: string
  selectedMember: ChatSelectedMemberInterface
  unreadMessages: number
}

export interface ChatMessageInterface {
  text: string
}

export interface ChatSelectedMemberInterface {
  _id: string
  firstName: string
  lastName: string
  profilePicture: string
}

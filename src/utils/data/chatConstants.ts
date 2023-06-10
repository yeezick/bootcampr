import { ChatMessageInterface } from 'interfaces'

export enum ChatScreen {
  Main = 'main',
  Messages = 'messages',
  ComposeNewChat = 'composeNewChat',
  EditChatRoom = 'editChatRoom',
  InviteNewMembers = 'inviteNewMembers',
  MemberProfile = 'memberProfile',
}

export const emptyChatText: ChatMessageInterface = {
  text: '',
}

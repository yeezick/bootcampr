import {
  ChatMessageInterface,
  ChatSliceInterface,
} from 'interfaces/ChatInterface'

export const initialState: ChatSliceInterface = {
  visibleChat: false,
  _id: '',
  isGroup: false,
  participants: [],
  displayName: '',
  selectedMember: {
    _id: '',
    firstName: '',
    lastName: '',
    profilePicture: '',
  },
  unreadMessages: 0,
}

export enum ChatScreen {
  Main = 'main',
  Messages = 'messages',
  ComposeNewChat = 'composeNewChat',
  EditChatRoom = 'editChatRoom',
  InviteNewMembers = 'inviteNewMembers',
  MemberProfile = 'memberProfile',
}

export enum DefaultIcons {
  NoMessages = 'https://i.postimg.cc/bN6vcwc9/Screen-Shot-2023-04-18-at-10-32-05-PM.png',
  NoConversations = 'https://i.postimg.cc/bN6vcwc9/Screen-Shot-2023-04-18-at-10-32-05-PM.png',
  NoMembers = 'https://i.postimg.cc/VNBQ0xHP/Screen-Shot-2023-05-26-at-8-08-16-PM.png',
}

export const emptyChatText: ChatMessageInterface = {
  text: '',
}

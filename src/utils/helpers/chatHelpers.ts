import {
  setActiveChatRoomId,
  toggleChatClose,
} from 'utils/redux/slices/chatSlice'

export const closeChatBox = dispatch => {
  dispatch(setActiveChatRoomId(null))
  dispatch(toggleChatClose())
}

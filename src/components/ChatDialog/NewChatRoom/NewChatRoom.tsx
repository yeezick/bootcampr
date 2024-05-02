import { useState, useEffect } from 'react'
import { Checkbox, FormControlLabel } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  createGroupChatRoom,
  createOrGetPrivateChatRoom,
  updateGroupChatParticipants,
} from 'utils/api/chat'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import {
  fetchMessages,
  onScreenUpdate,
  processChatRoom,
  selectChat,
  selectTeamChat,
  setCurrentChat,
} from 'utils/redux/slices/chatSlice'
import { ChatScreen } from 'utils/data/chatConstants'
import { UserDetails } from 'components/ChatDialog/UserDetails/UserDetails'
import { useSocketEvents } from 'components/Notifications/Socket'
import { selectMembersAsTeam } from 'utils/redux/slices/projectSlice'
import { errorSnackbar, successSnackbar } from 'utils/helpers/commentHelpers'
import './NewChatRoom.scss'
import { isTeamMembersSelected } from 'utils/functions/chatLogic'
import { PrimaryButton } from 'components/Buttons'

export const NewChatRoom = ({ chatScreen }) => {
  const dispatch = useAppDispatch()
  const { createNewRoom } = useSocketEvents(false)
  const currentConversation = useAppSelector(selectChat)
  const authUser = useAppSelector(selectAuthUser)
  const members = useAppSelector(selectMembersAsTeam)
  const teamChat = useAppSelector(selectTeamChat)
  const [selectedChatUsers, setSelectedChatUsers] = useState([])
  const [inviteList, setInviteList] = useState([])
  const [allChecked, setAllChecked] = useState(false)
  const [memberChecked, setMemberChecked] = useState({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const membersWithoutAuth = members.filter(
    member => member._id !== authUser._id
  )

  const membersInviteInfo =
    'Invited members will immediately join the chat but they will still receive an email notification.'

  useEffect(() => {
    let usersToInvite
    if (chatScreen === 'inviteNewMembers') {
      const currentParticipantIds = new Set(
        currentConversation.participants.map(pp => pp.userInfo._id)
      )
      //remaining users
      usersToInvite = membersWithoutAuth.filter(
        user => !currentParticipantIds.has(user._id)
      )
    } else {
      //all the users except auth user
      usersToInvite = membersWithoutAuth
    }

    const memberState = {}
    usersToInvite.forEach(member => {
      memberState[member._id] = false
    })

    setMemberChecked(memberState)
    setInviteList(usersToInvite)
    setSelectedChatUsers([])
  }, [currentConversation])

  useEffect(() => {
    const allMembersSelected =
      Object.values(memberChecked).length &&
      Object.values(memberChecked).every(status => status)
    setAllChecked(allMembersSelected)
  }, [memberChecked])

  const handleAllMembersCheck = () => {
    const newCheckedStatus = !allChecked
    setAllChecked(newCheckedStatus)
    const memberState = membersWithoutAuth.reduce((updatedState, member) => {
      updatedState[member._id] = newCheckedStatus
      return updatedState
    }, {})

    setMemberChecked(memberState)
    if (newCheckedStatus) {
      setSelectedChatUsers(inviteList)
    } else {
      setSelectedChatUsers([])
    }
  }

  const handleMemberCheck = member => {
    const newState = !memberChecked[member._id]
    setMemberChecked(prevStates => ({
      ...prevStates,
      [member._id]: newState,
    }))
    if (newState) {
      setSelectedChatUsers(prevSelected => [...prevSelected, member])
    } else {
      setSelectedChatUsers(prevSelected =>
        prevSelected.filter(user => user._id !== member._id)
      )
    }
  }

  const fetchChatMessages = async chat => {
    if (!chat.messages || !chat.messages.length) {
      try {
        const resultAction = await dispatch(
          fetchMessages({
            chatId: chat._id,
            chatType: chat.chatType,
          })
        ).unwrap()
        return { ...chat, messages: resultAction.messages }
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }
    return chat
  }

  const handleCreateOrUpdateGroupChatRoom = async selectedUserIds => {
    let newRoom
    const currentParticipants = currentConversation.participants
    const isAllTeamMembersSelected = isTeamMembersSelected(
      currentParticipants,
      selectedUserIds,
      members
    )

    if (isAllTeamMembersSelected) {
      const teamChatWithMessages = await fetchChatMessages(teamChat)
      newRoom = teamChatWithMessages
    } else if (chatScreen === ChatScreen.ComposeNewChat) {
      const allParticipantIds = [...selectedUserIds, authUser._id]
      newRoom = await createGroupChatRoom(allParticipantIds)
    } else {
      newRoom = await updateGroupChatParticipants(
        currentConversation._id,
        selectedUserIds
      )
    }
    return newRoom
  }

  const handleCreatePrivateChatRoom = async selectedUserIds => {
    const recepientId = selectedUserIds[0]
    const chatResponse = await createOrGetPrivateChatRoom(recepientId)
    return chatResponse
  }

  const handleCreateChatRoom = async () => {
    setIsLoading(true)
    try {
      const selectedUserIds = selectedChatUsers.map(user => user._id)
      if (
        currentConversation.chatType === 'group' ||
        selectedUserIds.length > 1
      ) {
        let newRoom = await handleCreateOrUpdateGroupChatRoom(selectedUserIds)
        newRoom = await dispatch(processChatRoom(newRoom)).unwrap()
        dispatch(setCurrentChat(newRoom))
        createNewRoom({
          chatRoom: newRoom,
          receiverIds: selectedUserIds,
        })
      } else {
        const chatInfo = await handleCreatePrivateChatRoom(selectedUserIds)
        let room = chatInfo.chatRoom
        room = await dispatch(processChatRoom(room)).unwrap()
        if (chatInfo.isNew) {
          createNewRoom({ chatRoom: room, receiverIds: selectedUserIds })
        }
        dispatch(setCurrentChat(room))
      }
      dispatch(successSnackbar('Successfully created a chat room.'))
      setSelectedChatUsers([])
      dispatch(onScreenUpdate(ChatScreen.ChatRoom))
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      dispatch(
        errorSnackbar("Couldn't create a chat room. Please try again later")
      )
      setIsLoading(false)
    }
  }

  const notSelectedMembers = inviteList.filter(
    member => !memberChecked[member._id]
  )

  const someSelectedMembers =
    inviteList.length > notSelectedMembers.length &&
    notSelectedMembers.length !== 0

  const sortedInviteList = inviteList.sort((a, b) =>
    a.firstName.toLocaleLowerCase() > b.firstName.toLocaleLowerCase() ? 1 : -1
  )

  return (
    <div className='new-chat-container'>
      <section className='members-invite'>
        <div className='members-invite-select'>
          <p>Select members to invite to your chat room</p>
          <div className='members-grid'>
            <FormControlLabel
              control={
                <Checkbox
                  checked={allChecked}
                  indeterminate={someSelectedMembers}
                  onChange={handleAllMembersCheck}
                  className='member-chat-checkbox'
                />
              }
              label='Invite all members'
            />
            {sortedInviteList.map(member => (
              <FormControlLabel
                key={member._id}
                control={
                  <Checkbox
                    checked={memberChecked[member._id]}
                    onChange={() => handleMemberCheck(member)}
                    className='member-chat-checkbox'
                  />
                }
                label={
                  <UserDetails
                    title={`${member.firstName} ${member.lastName}`}
                    userId={member._id}
                    description={member.role}
                    avatarSize='small'
                  />
                }
              />
            ))}
          </div>
        </div>
        <p className='members-invite-info'>{membersInviteInfo}</p>
      </section>
      <PrimaryButton
        loading={isLoading}
        type='submit'
        onClick={handleCreateChatRoom}
        disabled={!selectedChatUsers.length}
        label={
          chatScreen === ChatScreen.ComposeNewChat
            ? 'Create Chat Room'
            : 'Invite to Chat'
        }
      />
    </div>
  )
}

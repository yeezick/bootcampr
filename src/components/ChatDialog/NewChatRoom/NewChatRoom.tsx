import { useState, useEffect } from 'react'
import { Button, Checkbox, FormControlLabel } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  createGroupChatRoom,
  createOrGetPrivateChatRoom,
  updateGroupChatParticipants,
} from 'utils/api/chat'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import {
  onScreenUpdate,
  selectChat,
  setCurrentChat,
} from 'utils/redux/slices/chatSlice'
import { ChatScreen } from 'utils/data/chatConstants'
import { UserThumbnail } from 'components/ChatDialog/UserThumbnail/UserThumbnail'
import { ButtonStyle } from 'utils/data/authSettingsConstants'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'
import { selectProject } from 'utils/redux/slices/projectSlice'
import './NewChatRoom.scss'

export const NewChatRoom = ({ chatScreen }) => {
  const dispatch = useAppDispatch()
  const currentConversation = useAppSelector(selectChat)
  const authUser = useAppSelector(selectAuthUser)
  const project = useAppSelector(selectProject)
  const [selectedChatUsers, setSelectedChatUsers] = useState([])
  const [inviteList, setInviteList] = useState([])
  const [allChecked, setAllChecked] = useState(false)
  const [memberChecked, setMemberChecked] = useState({})
  const members = [...project.members.designers, ...project.members.engineers]
  const membersWithoutAuth = members.filter(
    member => member._id !== authUser._id
  )

  const membersInviteInfo =
    'Invited members will immediately join the chat but they will still receive an email notification.'

  useEffect(() => {
    let usersToInvite
    if (chatScreen === 'inviteNewMembers') {
      const currentParticipantIds = new Set(
        currentConversation.participants.map(pp => pp.participant._id)
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
  const handleCreateChatRoom = async () => {
    try {
      let newRoom
      const selectedUserIds = selectedChatUsers.map(user => user._id)
      if (selectedChatUsers.length > 1) {
        newRoom =
          chatScreen === ChatScreen.ComposeNewChat
            ? await createGroupChatRoom(selectedUserIds)
            : await updateGroupChatParticipants(
                currentConversation._id,
                selectedUserIds
              )
      } else {
        const recepientId = selectedUserIds[0]
        newRoom = await createOrGetPrivateChatRoom(recepientId)
      }
      dispatch(setCurrentChat(newRoom))
      dispatch(
        createSnackBar({
          isOpen: true,
          horizontal: 'right',
          message: 'Successfully created a chat room.',
          duration: 5000,
          severity: 'success',
        })
      )
      setSelectedChatUsers([])
      dispatch(onScreenUpdate(ChatScreen.ChatRoom))
    } catch (error) {
      console.error(error)
      dispatch(
        createSnackBar({
          isOpen: true,
          horizontal: 'right',
          message: "Couldn't create a chat room. Please try again later",
          duration: 5000,
          severity: 'error',
        })
      )
    }
  }

  const notSelectedMembers = inviteList.filter(
    member => !memberChecked[member._id]
  )
  const someSelectedMembers =
    inviteList.length > notSelectedMembers.length &&
    notSelectedMembers.length !== 0

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
            {inviteList.map(member => (
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
                  <UserThumbnail
                    title={`${member.firstName} ${member.lastName}`}
                    description={member.role}
                    profilePicture={member.profilePicture}
                    avatarSize='medium'
                    avatarType='single'
                  />
                }
              />
            ))}
          </div>
        </div>
        <p className='members-invite-info'>{membersInviteInfo}</p>
      </section>
      <Button
        className='chat-button'
        variant='contained'
        type='submit'
        style={{
          background: ButtonStyle.Orange.background,
          color: ButtonStyle.Orange.color,
        }}
        onClick={handleCreateChatRoom}
        disabled={!selectedChatUsers.length}
      >
        {chatScreen === ChatScreen.ComposeNewChat
          ? 'Create Chat Room'
          : 'Invite to Chat'}
      </Button>
    </div>
  )
}

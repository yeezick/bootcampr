import { useEffect, useState } from 'react'
import { MdOutlineSearch } from 'react-icons/md'
import { RxDotFilled } from 'react-icons/rx'
import {
  getAllConversations,
  updateGroupMessageReadStatus,
  updatePrivateMessageReadStatus,
} from 'utils/api/chat'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectAuthUser,
  setCurrentConversation,
  setSelectedMember,
} from 'utils/redux/slices/userSlice'
import './Conversations.scss'
import { formatLastMessageTimestamp } from 'utils/functions/utilityFunctions'
import { GroupAvatarGrid } from '../GroupAvatarGrid/GroupAvatarGrid'

export const Conversations = ({ handleConversationClick }) => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const [threads, setThreads] = useState([])
  const [listResults, setListResults] = useState('empty')
  const defaultImg =
    'https://i.postimg.cc/bN6vcwc9/Screen-Shot-2023-04-18-at-10-32-05-PM.png'

  useEffect(() => {
    const getThreads = async () => {
      const res = await getAllConversations(authUser._id)
      if (res) {
        setThreads(res)
        res.length > 0
          ? setListResults('conversations')
          : setListResults('noConversations')
      }
    }
    getThreads()
  }, [authUser._id])

  const handleConvoClick = async (
    chatId: string,
    participants: any,
    groupName: string
  ) => {
    if (participants.length > 2) {
      dispatch(
        setCurrentConversation({
          _id: chatId,
          isGroup: true,
          participants,
          displayName: groupName,
        })
      )
      updateGroupMessageReadStatus(authUser._id, chatId)
    } else {
      const recipient = participants.filter(
        participant => participant._id !== authUser._id
      )

      dispatch(
        setCurrentConversation({
          _id: chatId,
          isGroup: false,
          participants,
          displayName: `${recipient[0].firstName} ${recipient[0].lastName}`,
        })
      )
      dispatch(
        setSelectedMember({
          _id: recipient[0]._id,
          firstName: recipient[0].firstName,
          lastName: recipient[0].lastName,
          profilePicture: recipient[0].profilePicture,
        })
      )
      updatePrivateMessageReadStatus(authUser._id, chatId)
    }

    await handleConversationClick()
  }

  return (
    <div className='conversations-container'>
      <div className='search'>
        <MdOutlineSearch size={24} />
        <input placeholder='Search Chat'></input>
      </div>
      <ConversationsList
        authUser={authUser}
        listResults={listResults}
        threads={threads}
        defaultImg={defaultImg}
        handleConvoClick={handleConvoClick}
      />
    </div>
  )
}

const ConversationsList = ({
  authUser,
  listResults,
  threads,
  defaultImg,
  handleConvoClick,
}) => {
  if (listResults === 'empty') {
    return <></>
  }

  if (listResults === 'conversations') {
    return (
      <div className='conversations-list'>
        {threads.map(
          ({
            _id: chatId,
            participants,
            groupName,
            lastMessage,
            lastActive,
          }) => {
            let isMessageRead = false
            if (lastMessage) {
              isMessageRead = lastMessage.readBy.some(
                userObj => userObj.user.toString() === authUser._id
              )
            }

            return (
              <div
                className='conversation-grid'
                key={chatId}
                onClick={() =>
                  handleConvoClick(chatId, participants, groupName)
                }
              >
                <ConversationThumbnail
                  authUser={authUser}
                  chatId={chatId}
                  groupName={groupName}
                  participants={participants}
                  lastMessage={lastMessage}
                  isMessageRead={isMessageRead}
                  lastActive={lastActive}
                />
              </div>
            )
          }
        )}
      </div>
    )
  }

  if (listResults === 'noConversations') {
    return (
      <div className='no-results'>
        <img src={defaultImg} alt='no data' />
        <p>Don't be shy! Start a conversation</p>
      </div>
    )
  }
}

const ConversationThumbnail = ({
  authUser,
  chatId,
  groupName,
  participants,
  lastMessage,
  isMessageRead,
  lastActive,
}) => {
  if (participants.length > 2) {
    const members = participants.filter(
      ({ participant }) => participant._id !== authUser._id
    )
    const pictures = members.map(
      ({ participant }) => participant.profilePicture
    )

    return (
      <>
        <div className='avatar-grid'>
          <GroupAvatarGrid
            picturesArray={pictures}
            avatarSize={'medium'}
            chatType={'group'}
          />
        </div>
        <div className='thumbnail-right'>
          <div className='thread-details-grid'>
            <h5 className={lastMessage && !isMessageRead && 'unread-message'}>
              {groupName || 'Group Chat'}
            </h5>
            <LastMessageText
              lastMessage={lastMessage}
              authUser={authUser}
              isMessageRead={isMessageRead}
            />
          </div>
          <div className='dot-grid'>
            {lastMessage ? (
              <>
                <p>{formatLastMessageTimestamp(lastMessage.timestamp)}</p>
                <RxDotFilled
                  size={26}
                  className={
                    !isMessageRead ? 'unread-dot-visible' : 'unread-dot-hidden'
                  }
                />
              </>
            ) : (
              <>
                <p>{formatLastMessageTimestamp(lastActive)}</p>
                <RxDotFilled size={26} className='unread-dot-hidden' />
              </>
            )}
          </div>
        </div>
      </>
    )
  }

  if (participants.length === 2) {
    const recipient = participants.filter(
      participant => participant._id !== authUser._id
    )
    return (
      <>
        <GroupAvatarGrid
          picturesArray={recipient[0].profilePicture}
          avatarSize={'medium'}
          chatType={'private'}
        />
        <div className='thumbnail-right'>
          <div className='thread-details-grid'>
            <h5 className={lastMessage && !isMessageRead && 'unread-message'}>
              {recipient[0].firstName} {recipient[0].lastName}
            </h5>
            <LastMessageText
              lastMessage={lastMessage}
              authUser={authUser}
              isMessageRead={isMessageRead}
            />
          </div>
          <div className='dot-grid'>
            {lastMessage ? (
              <>
                <p>{formatLastMessageTimestamp(lastMessage.timestamp)}</p>
                <RxDotFilled
                  size={26}
                  className={
                    !isMessageRead ? 'unread-dot-visible' : 'unread-dot-hidden'
                  }
                />
              </>
            ) : (
              <>
                <p>{formatLastMessageTimestamp(lastActive)}</p>
                <RxDotFilled size={26} className='unread-dot-hidden' />
              </>
            )}
          </div>
        </div>
      </>
    )
  }
}

const LastMessageText = ({ lastMessage, authUser, isMessageRead }) => {
  if (lastMessage) {
    return (
      <p className={!isMessageRead && 'unread-message'}>
        {lastMessage.sender._id === authUser._id
          ? 'You'
          : lastMessage.sender.firstName}
        : {lastMessage.text || 'Media message'}
      </p>
    )
  } else {
    return <p>No messages...</p>
  }
}

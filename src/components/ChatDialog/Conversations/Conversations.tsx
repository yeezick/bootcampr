import { useEffect, useState } from 'react'
import { MdOutlineSearch } from 'react-icons/md'
import { getAllConversations } from 'utilities/api/chat'
import { useAppDispatch, useAppSelector } from 'utilities/redux/hooks'
import {
  selectAuthUser,
  setCurrentConversation,
} from 'utilities/redux/slices/userSlice'
import './Conversations.scss'

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

  const handleConvoClick = async (chatId: string, participants: any) => {
    participants.length > 2
      ? dispatch(
          setCurrentConversation({
            _id: chatId,
            isGroup: true,
            participants,
          })
        )
      : dispatch(
          setCurrentConversation({ _id: chatId, isGroup: false, participants })
        )

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
            groupPhoto,
            lastMessage,
          }) => (
            <div
              className='conversation-grid'
              key={chatId}
              onClick={() => handleConvoClick(chatId, participants)}
            >
              <ConversationThumbnail
                authUser={authUser}
                chatId={chatId}
                groupPhoto={groupPhoto}
                groupName={groupName}
                participants={participants}
                lastMessage={lastMessage}
              />
            </div>
          )
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
  groupPhoto,
  groupName,
  participants,
  lastMessage,
}) => {
  if (participants.length > 2) {
    return (
      <>
        <div className='avatar-grid'>
          <img src={groupPhoto} alt='avatar' key={chatId} />
        </div>
        <div className='thread-details-grid'>
          <h5>
            {groupName} ({participants.length})
          </h5>
          <p>
            {lastMessage.sender._id === authUser._id
              ? 'You'
              : lastMessage.sender.firstName}
            :{' '}
            {lastMessage.text.length > 28
              ? `${lastMessage.text.slice(0, 28)}...`
              : lastMessage.text || 'Media message'}
          </p>
        </div>
      </>
    )
  }

  if (participants.length === 2) {
    return (
      <>
        <div className='avatar-grid'>
          <img src={participants[1].profilePicture} alt='avatar' key={chatId} />
        </div>
        <div className='thread-details-grid'>
          <h5>
            {participants[1].firstName} {participants[1].lastName}
          </h5>
          <p>
            {lastMessage.sender._id === authUser._id
              ? 'You'
              : lastMessage.sender.firstName}
            :{' '}
            {lastMessage.text.length > 28
              ? `${lastMessage.text.slice(0, 28)}...`
              : lastMessage.text || 'Media message'}
          </p>
        </div>
      </>
    )
  }
}

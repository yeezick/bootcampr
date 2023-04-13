import { useEffect, useState } from 'react'
import { MdOutlineSearch } from 'react-icons/md'
import './Conversations.scss'
import { getAllConversations } from '../../../utilities/api/chat'
import { useAppDispatch, useAppSelector } from 'utilities/redux/hooks'
import {
  selectAuthUser,
  setCurrentConversation,
} from 'utilities/redux/slices/userSlice'

export const Conversations = ({ handleConversationClick }) => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const [threads, setThreads] = useState([])

  useEffect(() => {
    const getThreads = async () => {
      const res = await getAllConversations(authUser._id)
      setThreads(res)
    }
    getThreads()
  }, [authUser._id])

  const handleConvoClick = async (_id: string, participants: any) => {
    participants.length > 2
      ? dispatch(
          setCurrentConversation({
            _id,
            isGroup: true,
            participants,
          })
        )
      : dispatch(setCurrentConversation({ _id, isGroup: false, participants }))

    await handleConversationClick()
  }

  return (
    <div className='conversations-container'>
      <div className='search'>
        <MdOutlineSearch size={24} />
        <input placeholder='Search Chat'></input>
      </div>
      {threads.length > 0 ? (
        <div className='conversations-list'>
          {threads.map(
            ({ _id, participants, groupName, groupPhoto, lastMessage }) => (
              <div
                className='conversation-grid'
                key={_id}
                onClick={() => handleConvoClick(_id, participants)}
              >
                <div className='avatar-grid'>
                  {participants.length > 2 ? (
                    <img src={groupPhoto} alt='avatar' key={_id} />
                  ) : (
                    <img
                      src={participants[1].profilePicture}
                      alt='avatar'
                      key={_id}
                    />
                  )}
                </div>
                <div className='thread-details-grid'>
                  {participants.length > 2 ? (
                    <h5>
                      {groupName} ({participants.length})
                    </h5>
                  ) : (
                    <h5>
                      {participants[1].firstName} {participants[1].lastName}
                    </h5>
                  )}
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
              </div>
            )
          )}
        </div>
      ) : (
        <p>You have no conversations</p>
      )}
    </div>
  )
}

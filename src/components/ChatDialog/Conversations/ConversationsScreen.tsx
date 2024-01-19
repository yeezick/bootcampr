import { ChatIcons } from 'utils/data/chatConstants'
import { ConversationThumbnail } from './ConversationThumbnail'
export const ConversationsScreen = ({
  authUser,
  chatsListStatus,
  threads,
  handleConvoClick,
}) => {
  if (chatsListStatus === 'empty') {
    return <>No Message</>
  }
  //Conversation Summary screen
  if (chatsListStatus === 'conversations') {
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
            const messageIsUnread = chatId in authUser.unreadMessages
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
                  groupName={groupName}
                  participants={participants}
                  lastMessage={lastMessage}
                  lastActive={lastActive}
                  messageIsUnread={messageIsUnread}
                />
              </div>
            )
          }
        )}
      </div>
    )
  }

  if (chatsListStatus === 'noConversations') {
    return (
      <div className='no-results'>
        <img src={ChatIcons.NoConversations} alt='no data' />
        <p>Don't be shy! Start a conversation</p>
      </div>
    )
  }
}

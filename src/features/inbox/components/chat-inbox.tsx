
import { ChatProvider } from '../context/chat-context'
import ChatPage from './chat-page'

const ChatInbox = () => {
  return (
    <>
    <ChatProvider>
        <ChatPage/>
    </ChatProvider>
    </>
  )
}

export default ChatInbox
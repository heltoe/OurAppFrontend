import React, { useState } from 'react'
import styled from 'styled-components'
import { BlockStyled } from '@/components/ui/Block'
import MessageController from '@/components/pages/chat/MessageController'
import Message, { MessageType } from '@/components/pages/chat/Message'
import Editor from '@/components/ui/Editor'
import { ElementFileType } from '@/components/pages/chat/BindFile'

type SendMessageType = {
  text: string
  photos: ElementFileType[]
}

const ChatPageStyled = styled.div`
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 70px);
  padding-top: 30px;
  padding-bottom: 30px;
`
const WrapperContentStyled = styled.div`
  display: flex;
  width: 560px;
`
const BLockContainer = styled(BlockStyled)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0;
`
const ChatPage: React.FC = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<MessageType[]>([])
  const sendMessage = (message: SendMessageType) => {
    // TODO send message
    const modifyMessage = {
      ...message,
      photos: message.photos.map(item => item.preview),
      messageId: 1,
      senderId: 1,
      image: 'https://st.depositphotos.com/2000885/1902/i/450/depositphotos_19021343-stock-photo-red-heart.jpg',
      name: 'Влад',
      time: '24.05.1995'
    }
    setMessages((oldMessages: any) => {
      return [...oldMessages, modifyMessage]
    })
  }
  return (
    <ChatPageStyled className="wrapper">
      <WrapperContentStyled>
        <BLockContainer>
          {
            messages.map(item => 
              <Message
                messageId={item.messageId}
                senderId={item.senderId}
                image={item.image}
                name={item.name}
                time={item.time}
                text={item.text}
                photos={item.photos}
              />
            )
          }
          {message}
          <Editor value={message} onChange={(msg) => setMessage(msg)} />
          <MessageController sendMessage={(message) => sendMessage(message)}/>
        </BLockContainer>
      </WrapperContentStyled>
    </ChatPageStyled>
  )
} 

export default ChatPage

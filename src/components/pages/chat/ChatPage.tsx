import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { PageStyled } from '@/components/common/Page'
import { BlockStyled } from '@/components/ui/Block'
import MessageController from '@/components/pages/chat/MessageController'
import Message, { MessageType } from '@/components/pages/chat/Message'
import EmptyPlaceholder from '@/components/common/EmptyPlaceholder'
import Icon from '@/components/ui/Icon'
import { ElementFileType } from '@/components/pages/chat/BindFile'
import { changeRecipmentId } from '@/components/pages/chat/ChatPage.model'

type SendMessageType = {
  text: string
  photos: ElementFileType[]
}

const ChatPageStyled = styled(PageStyled)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
`
const TestStyled = styled.div`
  width: 560px;
  height: 1500px;
  background-color: grey;
`
const BLockContainer = styled(BlockStyled)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 560px;
  border-radius: 8px 8px 0 0;
  padding: 0;
`
const ButtonGoToLastMessage = styled.div<{ isShow: boolean }>`
  display: ${(prop) => prop.isShow ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: absolute;
  top: -50px;
  right: 20px;
  cursor: pointer;
  z-index: 100;
`
const ChatPage: React.FC = () => {
  const chatPage = useRef(null)
  const [messages, setMessages] = useState<MessageType[]>([])
  const [isShow, setIsShow] = useState(false)
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
    console.log(message)
    setMessages((oldMessages: any) => {
      return [...oldMessages, modifyMessage]
    })
    goToLastMessage()
  }
  const goToLastMessage = (typeScrolling: 'auto' | 'smooth' | undefined = 'smooth'): void => {
    const page = chatPage?.current as HTMLDivElement | null
    if (page) page.scrollTo({ top: page.scrollHeight, behavior: typeScrolling })
  }
  const handlerScrolling = (e: any) => {
    const wrapperContent = chatPage?.current as HTMLDivElement | null
    if (wrapperContent) {
      const condition = (wrapperContent.scrollHeight - wrapperContent.scrollTop) > (wrapperContent.offsetHeight + 200)
      if (condition && !isShow) setIsShow(true)
      if (!condition && isShow) setIsShow(false)
    }
  }
  useEffect(() => {
    goToLastMessage('auto')
    const params = new URLSearchParams(window.location.search)
    const id = params.get('recipment')
    if (id) changeRecipmentId(parseInt(id))
  }, [])
  useEffect(() => {
    const page = chatPage?.current as HTMLDivElement | null
    if (page) page.addEventListener('scroll', handlerScrolling)
    return () => {
      if (page) page.removeEventListener('scroll', handlerScrolling)
    }
  })
  return (
    <ChatPageStyled ref={chatPage}>
      <BLockContainer>
        {
          messages.length ? messages.map(item => 
            <Message
              key={item.messageId}
              messageId={item.messageId}
              senderId={item.senderId}
              image={item.image}
              name={item.name}
              time={item.time}
              text={item.text}
              photos={item.photos}
            />
          ) : <EmptyPlaceholder>Список сообщений пуст</EmptyPlaceholder>
        }
      </BLockContainer>
      <MessageController sendMessage={(message) => sendMessage(message)}>
        <ButtonGoToLastMessage isShow={isShow} onClick={() => goToLastMessage('smooth')}>
          <Icon type="arrow-down" color="#343753" />
        </ButtonGoToLastMessage>
      </MessageController>
    </ChatPageStyled>
  )
} 

export default ChatPage

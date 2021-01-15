import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { BlockStyled } from '@/components/ui/Block'
import MessageController from '@/components/pages/chat/MessageController'
import Message, { MessageType } from '@/components/pages/chat/Message'
import Icon, { IconStyled } from '@/components/ui/Icon'
import { ElementFileType } from '@/components/pages/chat/BindFile'

type SendMessageType = {
  text: string
  photos: ElementFileType[]
}

const ChatPageStyled = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  min-height: calc(100vh - 70px);
  padding-top: 30px;
  padding-bottom: 30px;
  overflow-y: auto;
  overflow-x: hidden;
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
    const page = document.querySelector('#content-container')
    if (page) page.scrollTo({ top: page.scrollHeight, behavior: typeScrolling })
  }
  const handlerScrolling = (e: any) => {
    const wrapperContent = chatPage?.current as HTMLDivElement | null
    if (wrapperContent) console.log(wrapperContent.offsetHeight, wrapperContent.scrollTop, window)
    // const page = document.querySelector('#content-container') as HTMLDivElement | null
    // const wrapperContent = chatPage?.current as HTMLDivElement | null
    // if (page && wrapperContent) console.log(wrapperContent.offsetHeight, page.scrollTop, page.offsetHeight)
    // const conditionToShow = isShow === false && page && wrapperContent && wrapperContent.offsetHeight - page.scrollTop > 700
    // const conditionToClose = isShow === true && page && wrapperContent && wrapperContent.offsetHeight - page.scrollTop < 700
    // if (conditionToShow) setIsShow(true)
    // if (conditionToClose) setIsShow(false)
  }
  useEffect(() => {
    goToLastMessage('auto')
  }, [])
  useEffect(() => {
    const page = chatPage?.current as HTMLDivElement | null
    if (page) page.addEventListener('scroll', handlerScrolling)
    return () => {
      if (page) page.removeEventListener('scroll', handlerScrolling)
    }
  })
  return (
    <ChatPageStyled ref={chatPage} className="wrapper">
      <WrapperContentStyled>
        <BLockContainer>
          {
            messages.map(item => 
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
            )
          }
          <MessageController sendMessage={(message) => sendMessage(message)}>
            <ButtonGoToLastMessage isShow={isShow} onClick={() => goToLastMessage('smooth')}>
              <Icon type="arrow-down" color="#343753" />
            </ButtonGoToLastMessage>
          </MessageController>
        </BLockContainer>
      </WrapperContentStyled>
    </ChatPageStyled>
  )
} 

export default ChatPage

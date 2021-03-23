import React, { useEffect, useRef, useState } from 'react'
import { useStore } from 'effector-react'
import styled from 'styled-components'
import { PageStyled } from '@/components/common/Page'
import { BlockStyled } from '@/components/ui/Block'
import MessageController from '@/components/pages/chat/MessageController'
import Message from '@/components/pages/chat/Message'
import EmptyPlaceholder from '@/components/common/EmptyPlaceholder'
import Icon from '@/components/ui/Icon'
import { changeRecipmentId, fetchListMessages } from '@/components/pages/chat/ChatPage.model'
import { $listMessages } from '@/components/pages/chat/ChatPage.model'

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
  const messages = useStore($listMessages)
  const [isShow, setIsShow] = useState(false)
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
    if (id) {
      changeRecipmentId(parseInt(id))
      fetchListMessages()
    }
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
              key={item.message_id}
              messageId={item.message_id}
              senderId={item.author}
              image=""
              name=""
              time={item.date}
              text={item.message}
              photos={[]}
            />
          ) : <EmptyPlaceholder>Список сообщений пуст</EmptyPlaceholder>
        }
      </BLockContainer>
      <MessageController sendMessageEmit={() => goToLastMessage()}>
        <ButtonGoToLastMessage isShow={isShow} onClick={() => goToLastMessage('smooth')}>
          <Icon type="arrow-down" color="#343753" />
        </ButtonGoToLastMessage>
      </MessageController>
    </ChatPageStyled>
  )
} 

export default ChatPage

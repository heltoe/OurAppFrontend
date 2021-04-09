import React, { useEffect, useRef, useState } from 'react'
import { useStore } from 'effector-react'
import styled from 'styled-components'
import { PageStyled } from '@/components/common/Page'
import { BlockStyled } from '@/components/ui/Block'
import MessageController from '@/components/pages/chat/MessageController'
import Message from '@/components/pages/chat/Message'
import EmptyPlaceholder from '@/components/common/EmptyPlaceholder'
import Icon from '@/components/ui/Icon'
import {
  changerecipientId,
  fetchListMessages,
  fetchMoreMessages,
  $canLoadMore,
  changeListMessages
} from '@/components/pages/chat/ChatPage.model'
import { $listMessages } from '@/components/pages/chat/ChatPage.model'
import { debounce, isVisible } from '@/helpers/utils'

const ChatPageStyled = styled(PageStyled)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
`
const BLockContainer = styled(BlockStyled)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 560px;
  border-radius: 8px 8px 0 0;
  padding: 0;
`
const ScrollingHelperStyled = styled.div`
  width: 560px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.rgb(props.theme.colors.white)};
  text-align: center;
  padding: 15px;
  border-radius: 8px 8px 0 0;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translateY(100%);
    width: 100%;
    height: 5px;
    background-color: ${(props) => props.theme.rgb(props.theme.colors.white)};
  }
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
  &:hover {
    use {
      fill: ${(props) => props.theme.rgb(props.theme.colors.purple1)};
    }
  }
`
const ChatPage: React.FC = () => {
  const messages = useStore($listMessages)
  const canLoadMore = useStore($canLoadMore)

  const chatPage = useRef(null)
  const loadMoreElement = useRef(null)
  const [isShow, setIsShow] = useState(false)

  const goToLastMessage = (typeScrolling: 'auto' | 'smooth' | undefined = 'auto'): void => {
    const page = chatPage?.current as HTMLDivElement | null
    if (page) page.scrollTo({ top: page.scrollHeight, behavior: typeScrolling })
  }
  const scrollPage = () => {
    const wrapperContent = chatPage?.current as HTMLDivElement | null
    if (wrapperContent) {
      const condition = (wrapperContent.scrollHeight - wrapperContent.scrollTop) > (wrapperContent.offsetHeight + 200)
      if (condition && !isShow) setIsShow(true)
      if (!condition && isShow) setIsShow(false)
    }
    if (canLoadMore) {
      const toggler = loadMoreElement?.current as HTMLDivElement | null
      if (toggler && isVisible(toggler)) fetchMoreMessages()
    }
  }
  const handlerScrolling = debounce(() => {
    scrollPage()
  }, 200)
  useEffect(() => {
    changeListMessages([])
    const params = new URLSearchParams(window.location.search)
    const id = params.get('recipient')
    if (id) {
      changerecipientId(parseInt(id))
      fetchListMessages()
    }
  }, [])
  useEffect(() => {
    goToLastMessage()
  }, [messages])
  useEffect(() => {
    const page = chatPage?.current as HTMLDivElement | null
    if (page) page.addEventListener('scroll', handlerScrolling)
    return () => {
      if (page) page.removeEventListener('scroll', handlerScrolling)
    }
  })
  return (
    <ChatPageStyled ref={chatPage}>
      {canLoadMore &&
        <ScrollingHelperStyled
          ref={loadMoreElement}
          className="no-select"
          onClick={() => fetchMoreMessages()}
        >
          Показать больше
        </ScrollingHelperStyled>
      }
      <BLockContainer>
        {
          messages.length ? messages.map((item, index) => 
            <Message
              key={index}
              messageId={item.message_id}
              author={item.author}
              time={item.date}
              text={item.message}
              photos={item.files}
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

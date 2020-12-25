import React from 'react'
import styled from 'styled-components'
import { BlockStyled } from '@/components/ui/Block'
import MessageController from '@/components/pages/chat/MessageController'

const ChatPageStyled = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 30px;
  height: 100%;
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
  return (
    <ChatPageStyled className="wrapper">
      <WrapperContentStyled>
        <BLockContainer>
          123
          <MessageController />
        </BLockContainer>
      </WrapperContentStyled>
    </ChatPageStyled>
  )
} 

export default ChatPage

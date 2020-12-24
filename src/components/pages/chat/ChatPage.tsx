import React from 'react'
import styled from 'styled-components'
import { BlockStyled } from '@/components/ui/Block'

const ChatPageStyled = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 30px;
  height: 100%;
`
const WrapperContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 560px;
`
const BLockContainer = styled(BlockStyled)`
  flex-grow: 1;
`
const ChatPage: React.FC = () => {
  return (
    <ChatPageStyled className="wrapper">
      <WrapperContentStyled>
        <BLockContainer>
          123
        </BLockContainer>
      </WrapperContentStyled>
    </ChatPageStyled>
  )
} 

export default ChatPage

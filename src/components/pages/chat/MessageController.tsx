import React from 'react'
import styled from 'styled-components'
import Icon from '@/components/ui/Icon'
import InputBox from '@/components/pages/chat/InputBox'

const IconWrapperStyled = styled.div`
  display: flex;
  cursor: pointer;
  margin-top: auto;
  &:hover {
    use {
      fill: ${(props) => props.theme.rgb(props.theme.colors.purple1)};
    }
  }
`
const MessageControllerStyled = styled.div`
  display: flex;
  width: 100%;
  max-width: 100%;
  border-radius: 0 0 8px 8px;
  margin-top: auto;
  background-color: ${(props) => props.theme.rgb(props.theme.colors.grey8)};
  border-top: ${(props) => `1px solid ${props.theme.rgb(props.theme.colors.grey7)}`};
  padding: 20px;
  ${IconWrapperStyled} {
    margin-bottom: 5px;
  }
`
const MessageWrapperStyled = styled.div`
  position: relative;
  display: flex;
  max-width: calc(100% - 70px);
  flex-grow: 1;
  border-radius: 8px;
  background-color: ${(props) => props.theme.rgb(props.theme.colors.white)};
  border: ${(props) => `1px solid ${props.theme.rgb(props.theme.colors.grey7)}`};
  margin: 0 10px;
  ${IconWrapperStyled} {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
`
const MessageController: React.FC = () => {
  const sendMessage = () => {
    console.log('send');
  }
  return (
    <MessageControllerStyled>
      <IconWrapperStyled>
        <Icon
          type="clip"
          color="grey"
          size="25px"
        />
      </IconWrapperStyled>
      <MessageWrapperStyled>
        <InputBox />
        <IconWrapperStyled>
          <Icon
            type="smile"
            color="grey"
            size="25px"
          />
        </IconWrapperStyled>
      </MessageWrapperStyled>
      <IconWrapperStyled onClick={() => sendMessage()}>
        <Icon
          type="send"
          color="grey"
          size="25px"
        />
      </IconWrapperStyled>
    </MessageControllerStyled>
  )
}

export default MessageController

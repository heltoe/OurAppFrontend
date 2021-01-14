import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getRouterByName } from '@/routes'
import Avatar from '@/components/ui/Avatar'
import GridImages from '@/components/pages/chat/GridImages'
import { BlockStyled } from '@/components/ui/Block'

export type MessageType = {
  messageId: number
  senderId: number
  image: string
  name: string
  time: string
  text: string
  photos: string[]
}
const MessageStyled = styled(BlockStyled)`
  display: flex;
  padding: 10px;
  transition: ${(props) => `background-color ${props.theme.transition}`};
`
const AvatarOvarlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: ${(props) => props.theme.transition};
  background-color: #fff;
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.rgba(props.theme.colors.purple2, 0)};
    transition: ${(props) => props.theme.transition};
    z-index: 10;
  }
  &:hover {
    &:after {
      background-color: ${(props) => props.theme.rgba(props.theme.colors.purple2, 0.1)};
    }
  }
`
const BlockColumnStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 60px);
  margin-left: 10px;
`
const MessageDataStyled = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 5px;
`
const WrapperAuthorTextStyled = styled.div`
  width: 80%;
`
const AuthorMessageStyled = styled.p`
  color: ${(props) => props.theme.rgb(props.theme.colors.darkBlue1)};
  font-weight: ${(props) => props.theme.fontWeight.middle};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80%;
  cursor: pointer;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -3px;
    opacity: 0;
    height: 1px;
    width: 100%;
    border-radius: 8px;
    background-color: ${(props) => props.theme.rgb(props.theme.colors.darkBlue1)};
    transition: ${(props) => `opacity ${props.theme.transition}`};
  }
  &:hover {
    &:after {
      opacity: 1;
    }
  }
`
const WrapperDataTextStyled = styled.div`
  width: 20%;
  text-align: right;
`
const DataMessageStyled = styled.p`
  font-size: 12px;
  color: ${(props) => props.theme.rgb(props.theme.colors.grey1)};
  margin-left: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const ContentMessageStyled = styled.div`
  display: flex;
  flex-direction: column;
`
const MessageTextStyled = styled.p`
  word-break: break-all;
  line-height: 1.2;
`
const Message: React.FC<MessageType> = ({ image, name, time, text, messageId, senderId, photos }) => {
  const linkMessage = 'profile-page'
  return (
    <MessageStyled>
      <Link to={`${getRouterByName(linkMessage).path}`}>
        <AvatarOvarlay>
          <Avatar size="50px" isRound image={image} />
        </AvatarOvarlay>
      </Link>
      <BlockColumnStyled>
        <MessageDataStyled>
          <WrapperAuthorTextStyled>
            <Link to={`${getRouterByName(linkMessage).path}`}>
              <AuthorMessageStyled>{name}</AuthorMessageStyled>
            </Link>
          </WrapperAuthorTextStyled>
          <WrapperDataTextStyled>
            <DataMessageStyled>{time}</DataMessageStyled>
          </WrapperDataTextStyled>
        </MessageDataStyled>
        <ContentMessageStyled>
          <MessageTextStyled>{text}</MessageTextStyled>
          <GridImages images={photos} />
        </ContentMessageStyled>
      </BlockColumnStyled>
    </MessageStyled>
  )
}

export default Message

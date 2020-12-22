import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Avatar from '@/components/ui/Avatar'
import { AvatarOvarlay } from '@/components/common/sidebar/body/Card'
import { BlockStyled } from '@/components/ui/Block'
import Icon, { IconStyled } from '@/components/ui/Icon'

type CardFriend = {
  id: number
  image: string
  status: string
  fullName: string
}

const ShowPhotoStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  cursor: pointer;
  & ${IconStyled} {
    opacity: 0;
    transition: ${(props) => `opacity ${props.theme.transition}`};
  }
`
const CardAvatarOverlay = styled(AvatarOvarlay)`
  &:hover {
    & ${IconStyled} {
      opacity: 1;
    }
  }
`
export const CardFriendStyled = styled(BlockStyled)`
  display: flex;
  padding: 10px;
  transition: ${(props) => props.theme.transition};
  &:hover {
    box-shadow: ${(props) => props.theme.shadow.shadow2};
    ${CardAvatarOverlay} {
      &:after {
        background-color: ${(props) => props.theme.rgba(props.theme.colors.purple2, 0.2)};
      }
    }
  }
`
const ContentWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  flex-grow: 1;
  padding: 10px;
`
const WriteMessageStyled = styled.p`
  margin-top: 10px;
  transition: ${(props) => `color ${props.theme.transition}`};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.rgb(props.theme.colors.purple1)};
  }
`
const LinkStyled = styled(Link)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 30px);
  transition: ${(props) => `color ${props.theme.transition}`};
  &:hover {
    color: ${(props) => props.theme.rgb(props.theme.colors.purple1)};
  }
`
const ControllerStyled = styled.div`
  position: absolute;
  right: 10px;
  top: 0px;
  cursor: pointer;
  &:hover {
    use {
      fill: ${(props) => props.theme.rgb(props.theme.colors.red)};
    }
  }
`
const CardFriend: React.FC<CardFriend> = ({ image, fullName }) => {
  return (
    <CardFriendStyled>
      <CardAvatarOverlay>
        <Avatar size="70px" isRound image={image} fullName={fullName} />
        {image && <ShowPhotoStyled>
          <Icon type="search-plus" color="#fff" size="18px" />
        </ShowPhotoStyled>}
      </CardAvatarOverlay>
      <ContentWrapperStyled>
        <LinkStyled to="/" className="middle">{fullName}</LinkStyled>
        <WriteMessageStyled className="middle">Написать сообщение</WriteMessageStyled>
        <ControllerStyled>
          <Icon type="remove-user" color="grey" size="25px" />
        </ControllerStyled>
      </ContentWrapperStyled>
    </CardFriendStyled>
  )
}

export default CardFriend

import React from 'react'
import { Link } from 'react-router-dom'
import { useStore } from 'effector-react'
import styled from 'styled-components'
import { $typePage, friendIdChanged, changeActiveUser } from '@/App.module'
import { removeFromFriends } from '@/components/pages/friends/models/Friends'
import { addToFriends, removeFromFriendShip } from '@/components/pages/friends/models/FriendShip'
import Avatar from '@/components/ui/Avatar'
import { BlockStyled } from '@/components/ui/Block'
import Icon, { IconStyled } from '@/components/ui/Icon'
import { getRouterByName } from '@/routes'
import { User } from '@/api/types'

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
const CardAvatarOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 80px;
  height: 79px;
  transition: ${(props) => `background-color ${props.theme.transition}`};
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.rgba(props.theme.colors.purple2, 0)};
    transition: ${(props) => props.theme.transition};
    z-index: 10;
  }
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
const WriteMessageStyled = styled(Link)`
  margin-top: 10px;
  transition: ${(props) => `color ${props.theme.transition}`};
  cursor: pointer;
  user-select: none;
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
  cursor: pointer;
  &:hover {
    &.green {
      use {
        fill: ${(props) => props.theme.rgb(props.theme.colors.green1)};
      }
    }
    &.red {
      use {
        fill: ${(props) => props.theme.rgb(props.theme.colors.red)};
      }
    }
  }
`
const WrapperIconsStyled = styled.div`
  display: flex;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  ${ControllerStyled} {
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
`

const CardFriend: React.FC<User> = ({
  id,
  first_name,
  last_name,
  gender,
  birth_date,
  phone,
  original_photo,
  croped_photo
}) => {
  const typePage = useStore($typePage)
  const clickHandler = (userId: number, type: string) => {
    friendIdChanged(userId)
    if (type === 'remove-from-friend') removeFromFriends()
    if (type === 'add-to-friends') addToFriends()
    if (type === 'remove-from-friendship') removeFromFriendShip()
  }
  const setActiveUser = () => {
    changeActiveUser({
      id,
      first_name,
      last_name,
      gender,
      birth_date,
      phone,
      original_photo,
      croped_photo
    })
  }
  return (
    <CardFriendStyled>
      <CardAvatarOverlay>
        <Avatar
          id={id}
          size="70px"
          isRound
          image={croped_photo || ''}
          fullName={`${first_name} ${last_name}`}
        />
        {croped_photo && <ShowPhotoStyled>
          <Icon type="search-plus" color="#fff" size="18px" />
        </ShowPhotoStyled>}
      </CardAvatarOverlay>
      <ContentWrapperStyled onClick={() => setActiveUser()}>
        <LinkStyled to="/" className="middle">{first_name} {last_name}</LinkStyled>
        <WriteMessageStyled
          to={`${getRouterByName('chat-page').path}?recipment=${id}`}
          className="middle"
          onClick={() => setActiveUser()}
        >
          Написать сообщение
        </WriteMessageStyled>
        <WrapperIconsStyled>
          {typePage !== 'friendship' && <ControllerStyled className="red" onClick={() => clickHandler(id, 'remove-from-friend')}>
            <Icon type="remove-user" color="grey" size="20px" />
          </ControllerStyled>}
          {typePage === 'friendship' && <ControllerStyled className="green" onClick={() => clickHandler(id, 'add-to-friends')}>
            <Icon type="check" color="grey" size="20px" />
          </ControllerStyled>}
          {typePage === 'friendship' && <ControllerStyled className="red" onClick={() => clickHandler(id, 'remove-from-friendship')}>
            <Icon type="close" color="grey" size="20px" />
          </ControllerStyled>}
        </WrapperIconsStyled>
      </ContentWrapperStyled>
    </CardFriendStyled>
  )
}

export default CardFriend

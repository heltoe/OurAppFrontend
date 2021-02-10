import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { clickHandlers, friendIdChanged } from '@/components/pages/friends/FriendsPage.module'
import Icon from '@/components/ui/Icon'
import Avatar, { AvatarStyled } from '@/components/ui/Avatar'

type CardUser = {
  id: number
  image: string
  firstName: string
  lastName: string
  isexistInFriendList: boolean
}

export const CardUserStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 160px;
  border-radius: 8px;
  & ${AvatarStyled} {
    border-radius: 8px;
  }
`
const WrapperContentStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`
const ControllerStyled = styled.div`
  margin-left: auto;
  cursor: pointer;
  &:hover {
    use {
      fill: ${(props) => props.theme.rgb(props.theme.colors.purple1)};
    }
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
const CardUser: React.FC<CardUser> = ({ id, image, firstName, lastName, isexistInFriendList }) => {
  const addToFriendShipList = (userId: number) => {
    friendIdChanged(userId)
    clickHandlers.addToFriendShip()
  }
  return (
    <CardUserStyled>
      <Link to="/">
        <Avatar
          id={id}
          size="160px"
          image={image}
          fullName={`${firstName} ${lastName}`}
        />
      </Link>
      <WrapperContentStyled>
        <LinkStyled to="/" className="middle">{firstName} {lastName}</LinkStyled>
        {!isexistInFriendList && <ControllerStyled onClick={() => addToFriendShipList(id)}>
          <Icon type="add-user" color="grey" size="20px" />
        </ControllerStyled>}
      </WrapperContentStyled>
    </CardUserStyled>
  )
}

export default CardUser

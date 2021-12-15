import React from 'react'
import styled from 'styled-components'
import { device } from '@/Theme'
import { friendIdChanged } from '@/App.module'
import { addToFriendShip } from '@/components/pages/friends/models/Users'
import Icon from '@/components/ui/Icon'
import Avatar, { AvatarStyled } from '@/components/ui/Avatar'

type CardUser = {
  id: number
  image: string
  firstName: string
  lastName: string
  isexistInFriendList: boolean,
}

export const CardUserStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 160px;
  border-radius: 8px;
  & ${AvatarStyled} {
    cursor: pointer;
    border-radius: 8px;
  }
  @media ${device.mobileL} {
    width: 100%;
  }
`
const WrapperContentStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  min-height: 22px;
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
const NameStyled = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 30px);
  transition: ${(props) => `color ${props.theme.transition}`};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.rgb(props.theme.colors.purple1)};
  }
`
const CardUser: React.FC<CardUser> = ({ id, image, firstName, lastName, isexistInFriendList }) => {
  const addToFriendShipList = (userId: number) => {
    friendIdChanged(userId)
    addToFriendShip()
  }
  return (
    <CardUserStyled>
      <div>
        <Avatar
          id={id}
          size="160px"
          image={image}
          fullName={`${firstName} ${lastName}`}
        />
      </div>
      <WrapperContentStyled>
        <NameStyled className="middle no-select">{firstName} {lastName}</NameStyled>
        {!isexistInFriendList && <ControllerStyled onClick={() => addToFriendShipList(id)}>
          <Icon type="add-user" color="grey" size="20px" />
        </ControllerStyled>}
      </WrapperContentStyled>
    </CardUserStyled>
  )
}

export default CardUser

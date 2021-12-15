import React from 'react'
import { useStore } from 'effector-react'
import { device } from '@/Theme'
import { $users } from '@/components/pages/friends/models/Users'
import styled from 'styled-components'
import { BlockStyled } from '@/components/ui/Block'
import CardUser, { CardUserStyled } from '@/components/pages/friends/cards/CardUser'
import EmptyPlaceholder from '@/components/common/EmptyPlaceholder'

const UserListStyled = styled(BlockStyled)<{ isSpecialStyle: boolean }>`
  display: flex;
  flex-wrap: wrap;
  padding-right: ${(props) => props.isSpecialStyle ? '0' : '20px' };
  padding-top: ${(props) => props.isSpecialStyle ? '0' : '20px' };
  margin-top: 20px;
  & ${CardUserStyled} {
    margin-right: 20px;
    margin-top: 20px;
  }
  @media ${device.mobileL} {
    padding-right: 20px;
    & ${CardUserStyled} {
      margin-right: 0;
    }
  }
`
const FindNewFriendList: React.FC = () => {
  const usersList = useStore($users)
  return (
    <UserListStyled isSpecialStyle={usersList.length > 0}>
      {
        usersList.length ? usersList.map((card) => (
          <CardUser
            key={card.user_id}
            id={card.user_id}
            image={card.photo}
            firstName={card.first_name}
            lastName={card.last_name}
            isexistInFriendList={card.exist_in_friend_list}
          />
        )) : <EmptyPlaceholder>Список пользователей пуст</EmptyPlaceholder>
      }
    </UserListStyled>
  )
}

export default FindNewFriendList

import React from 'react'
import styled from 'styled-components'
import { BlockStyled } from '@/components/ui/Block'
import CardUser, { CardUserStyled } from '@/components/pages/friends/CardUser'
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
`
const FindNewFriendList: React.FC = () => {
  const UserList: any[] = [];
  return (
    <UserListStyled isSpecialStyle={UserList.length > 0}>
      {
        UserList.length ? UserList.map((card) => (
          <CardUser
            key={card.id}
            id={card.id}
            image={card.image}
            fullName={card.fullName}
          />
        )) : <EmptyPlaceholder>Список пользователей пуст</EmptyPlaceholder>
      }
    </UserListStyled>
  )
}

export default FindNewFriendList

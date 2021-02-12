import React from 'react'
import { useStore } from 'effector-react'
import { $friendsGrid } from '@/components/pages/friends/Friends.Page.models'
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
`
const FindNewFriendList: React.FC = () => {
  const usersList = useStore($friendsGrid)
  return (
    <UserListStyled isSpecialStyle={usersList.users.length > 0}>
      {
        usersList.users.length ? usersList.users.map((card) => (
          <CardUser
            key={card.id}
            id={card.id}
            image={card.image}
            firstName={card.firstName}
            lastName={card.lastName}
            isexistInFriendList={card.existInFriendList}
          />
        )) : <EmptyPlaceholder>Список пользователей пуст</EmptyPlaceholder>
      }
    </UserListStyled>
  )
}

export default FindNewFriendList

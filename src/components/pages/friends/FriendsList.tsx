import React from 'react'
import styled from 'styled-components'
import { BlockStyled } from '@/components/ui/Block'
import CardFriend, { CardFriendStyled } from '@/components/pages/friends/CardFriend'
import EmptyPlaceholder from '@/components/common/EmptyPlaceholder'

const FriendsListStyled = styled(BlockStyled)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin-top: 20px;
  & ${CardFriendStyled} {
    position: relative;
    &:after,
    &:before {
      content: '';
      position: absolute;
      display: flex;
      height: 1px;
      width: calc(100% - 10px);
      left: 50%;
      transform: translateX(-50%);
      transition: ${(props) => props.theme.transition};
    }
    &:before {
      top: -1px;
      opacity: 0;
      background-color: ${(props) => props.theme.rgb(props.theme.colors.white)};
    }
    &:after {
      bottom: 0;
      background-color: ${(props) => props.theme.rgb(props.theme.colors.grey2)};
    }
    &:hover {
      z-index: 10;
      &:before {
        opacity: 1;
      }
      &:after {
        opacity: 0;
      }
    }
    &:last-child {
      &:after {
        opacity: 0;
      }
    }
  }
`
const FriendsList: React.FC = () => {
  const friendsList: any[] = [];
  return (
    <FriendsListStyled>
      {
        friendsList.length ? friendsList.map((card) => (
          <CardFriend
            key={card.id}
            id={card.id}
            image={card.image}
            status={card.status}
            fullName={card.fullName}
          />
        )) : <EmptyPlaceholder>Список друзей пуст</EmptyPlaceholder>
      }
    </FriendsListStyled>
  )
}

export default FriendsList

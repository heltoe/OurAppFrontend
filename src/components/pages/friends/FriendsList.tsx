import React from 'react'
import { useStore } from 'effector-react'
import { $typePage, $friendsGrid } from '@/components/pages/friends/FriendsPage.module'
import styled from 'styled-components'
import { BlockStyled } from '@/components/ui/Block'
import CardFriend, { CardFriendStyled } from '@/components/pages/friends/cards/CardFriend'
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
  const typePage = useStore($typePage)
  const friendsList = useStore($friendsGrid)
  return (
    <FriendsListStyled>
      {
        // @ts-ignore
        friendsList[typePage] && friendsList[typePage].length ? friendsList[typePage].map((card) => (
          <CardFriend
            key={card.id}
            id={card.id}
            firstName={card.firstName}
            lastName={card.lastName}
            status={card.status}
            image={card.image}
          />
        )) : <EmptyPlaceholder>Список друзей пуст</EmptyPlaceholder>
      }
    </FriendsListStyled>
  )
}

export default FriendsList

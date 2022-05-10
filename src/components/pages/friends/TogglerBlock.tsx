import React from 'react'
import styled from 'styled-components'
import { useStore } from 'effector-react'
import { $countFriendsShip } from '@/components/pages/friends/models/FriendShip'
import { $countAllFriends } from '@/components/pages/friends/models/Friends'
import { typePages, $typePage, typePageChanged } from '@/App.module'
import { BaseButtonStyled } from '@/components/ui/BaseButton'
import { BlockStyled } from '@/components/ui/Block'

const TogglerWrapperStyled = styled(BlockStyled)`
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-radius: 8px 8px 0 0;
`
const ToggleItemStyled = styled.div<{ active: boolean }>`
  display: flex;
  padding: 20px 10px;
  cursor: pointer;
  transition: ${(props) => props.theme.transition};
  border-bottom: ${(props) =>
    `2px solid ${props.theme.rgba(
      props.theme.colors.purple1,
      props.active ? 1 : 0,
    )}`};
`
const FindFriendStyled = styled(BaseButtonStyled)`
  padding: 10px;
  margin-left: auto;
`
export const TogglerBlock: React.FC = () => {
  const typePage = useStore($typePage)
  const countFriendsShip = useStore($countFriendsShip)
  const countAllFriends = useStore($countAllFriends)
  const arrItems = [
    {
      id: 1,
      name: `Все друзья ${countAllFriends}`,
      type: typePages.friends,
    },
    {
      id: 2,
      name: `Заявки в друзья ${countFriendsShip}`,
      type: typePages.friendship,
    },
  ]
  const setTypePage = (type: string) => {
    if (typePage !== type) typePageChanged(type)
  }
  return (
    <TogglerWrapperStyled>
      {arrItems.map((item) => (
        <ToggleItemStyled
          key={item.id}
          active={typePage === item.type}
          onClick={() => setTypePage(item.type)}
          className="no-select"
        >
          {item.name}
        </ToggleItemStyled>
      ))}
      <FindFriendStyled onClick={() => setTypePage(typePages.findFriend)}>
        Найти друзей
      </FindFriendStyled>
    </TogglerWrapperStyled>
  )
}

export default TogglerBlock

import React from 'react'
import styled from 'styled-components'
import { useStore } from 'effector-react'
import { $countFriendsShip } from '@/components/pages/friends/models/FriendShip'
import { $countAllFriends, $countOnlineFriends } from '@/components/pages/friends/models/Friends'
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
  border-bottom: ${(props) => `2px solid ${props.theme.rgba(props.theme.colors.purple1, props.active ? 1 : 0)}`};
`
const FindFriendStyled = styled(BaseButtonStyled)`
  padding: 10px;
  margin-left: auto;
`
export const TogglerBlock: React.FC = () => {
  const typePage = useStore($typePage)
  const countFriendsShip = useStore($countFriendsShip)
  const countAllFriends = useStore($countAllFriends)
  const countOnlineFriends = useStore($countOnlineFriends)
  const setTypePage = (type: string) => {
    if (typePage !== type) typePageChanged(type)
  }
  return (
    <TogglerWrapperStyled>
      <ToggleItemStyled
        active={typePage === typePages.friends}
        onClick={() => setTypePage(typePages.friends)}
        className="no-select"
      >
        Все друзья {countAllFriends}
      </ToggleItemStyled>
      <ToggleItemStyled
        active={typePage === typePages.online}
        onClick={() => setTypePage(typePages.online)}
        className="no-select"
      >
        Друзья онлайн {countOnlineFriends}
      </ToggleItemStyled>
      <ToggleItemStyled
        active={typePage === typePages.friendship}
        onClick={() => setTypePage(typePages.friendship)}
        className="no-select"
      >
        Заявки в друзья {countFriendsShip}
      </ToggleItemStyled>
      <FindFriendStyled onClick={() => setTypePage(typePages.findFriend)}>
        Найти друзей
      </FindFriendStyled>
    </TogglerWrapperStyled>
  )
}

export default TogglerBlock

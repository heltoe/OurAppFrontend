import React from 'react'
import styled from 'styled-components'
import { useStore } from 'effector-react'
import { $countFriendsShip } from '@/components/pages/friends/models/FriendShip'
import { $countAllFriends, $countOnlineFriends } from '@/components/pages/friends/models/Friends'
import { BaseButtonStyled } from '@/components/ui/BaseButton'
import { BlockStyled } from '@/components/ui/Block'

type ToggleBlockType = {
  activeTab: string
  setActiveTab(tab: string): void
}

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
export const TogglerBlock: React.FC<ToggleBlockType> = ({ activeTab, setActiveTab }) => {
  const countFriendsShip = useStore($countFriendsShip)
  const countAllFriends = useStore($countAllFriends)
  const countOnlineFriends = useStore($countOnlineFriends)
  return (
    <TogglerWrapperStyled>
      <ToggleItemStyled
        active={activeTab === 'friends'}
        onClick={() => setActiveTab('friends')}
        className="no-select"
      >
        Все друзья {countAllFriends}
      </ToggleItemStyled>
      <ToggleItemStyled
        active={activeTab === 'online'}
        onClick={() => setActiveTab('online')}
        className="no-select"
      >
        Друзья онлайн {countOnlineFriends}
      </ToggleItemStyled>
      <ToggleItemStyled
        active={activeTab === 'friendship'}
        onClick={() => setActiveTab('friendship')}
        className="no-select"
      >
        Заявки в друзья {countFriendsShip}
      </ToggleItemStyled>
      <FindFriendStyled onClick={() => setActiveTab('find-friend')}>
        Найти друзей
      </FindFriendStyled>
    </TogglerWrapperStyled>
  )
}

export default TogglerBlock

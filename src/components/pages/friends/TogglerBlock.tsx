import React from 'react'
import styled from 'styled-components'
import { useStore } from 'effector-react'
import { $counter } from '@/components/pages/friends/FriendsPage.module'
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
  const counter = useStore($counter)
  return (
    <TogglerWrapperStyled>
      <ToggleItemStyled
        active={activeTab === 'all'}
        onClick={() => setActiveTab('all')}
        className="no-select"
      >
        Все друзья {counter.all}
      </ToggleItemStyled>
      <ToggleItemStyled
        active={activeTab === 'online'}
        onClick={() => setActiveTab('online')}
        className="no-select"
      >
        Друзья онлайн {counter.online}
      </ToggleItemStyled>
      <ToggleItemStyled
        active={activeTab === 'frienship'}
        onClick={() => setActiveTab('frienship')}
        className="no-select"
      >
        Заявки в друзья {counter.friendship}
      </ToggleItemStyled>
      <FindFriendStyled onClick={() => setActiveTab('find-friend')}>
        Найти друзей
      </FindFriendStyled>
    </TogglerWrapperStyled>
  )
}

export default TogglerBlock

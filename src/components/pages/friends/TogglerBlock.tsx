import React, { useState } from 'react'
import styled from 'styled-components'
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
const LinkBtn = styled(BaseButtonStyled)`
  padding: 10px;
  margin-left: auto;
`
export const TogglerBlock: React.FC = () => {
    const [countAll, setCountAll] = useState(0)
    const [countOnline, setCountOnline] = useState(0)
    const [activeTab, setActiveTab] = useState('all')
  return (
    <TogglerWrapperStyled>
      <ToggleItemStyled
        active={activeTab === 'all'}
        onClick={() => setActiveTab('all')}
        className="no-select"
      >
        Все друзья {countAll}
      </ToggleItemStyled>
      <ToggleItemStyled
        active={activeTab === 'online'}
        onClick={() => setActiveTab('online')}
        className="no-select"
      >
        Друзья онлайн {countOnline}
      </ToggleItemStyled>
      <LinkBtn onClick={() => setActiveTab('find-friend')}>Найти друзей</LinkBtn>
    </TogglerWrapperStyled>
  )
}

export default TogglerBlock

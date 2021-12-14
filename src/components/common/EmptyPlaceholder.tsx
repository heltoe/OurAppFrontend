import React from 'react'
import styled from 'styled-components'
import Icon, { IconStyled } from '@/components/ui/Icon'

export const EmptyListStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px;
`

type EmptyPlaceholderType = {
  isShort?: boolean
}

const EmptyPlaceholder: React.FC<EmptyPlaceholderType> = ({ children, isShort = false }) => {
  return (
    <EmptyListStyled>
      {isShort && <Icon type="letter" size="26px" />}
      {!isShort && <p className="light no-select">{children}</p>}
    </EmptyListStyled>
  )
}

export default EmptyPlaceholder

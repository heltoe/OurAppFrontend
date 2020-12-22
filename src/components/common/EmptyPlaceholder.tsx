import React from 'react'
import styled from 'styled-components'

export const EmptyListStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px;
`

const EmptyPlaceholder: React.FC = ({ children }) => {
    return (
      <EmptyListStyled>
        <p className="light no-select">{children}</p>
      </EmptyListStyled>
    )
}

export default EmptyPlaceholder

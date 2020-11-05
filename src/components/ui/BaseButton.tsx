import React from 'react'
import styled from 'styled-components'

export interface IBaseButton {
  disabled?: boolean
}
const BaseButtonStyled = styled.button`
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: ${(props) => props.theme.rgb(props.theme.colors.white)};
  border-radius: 5px;
  background-color: ${(props) => props.theme.rgb(props.theme.colors.purple1)};
  padding: 15px;
  transition: ${(props) => `box-shadow ${props.theme.transition}`};
  &:hover {
    box-shadow: ${(props) => props.theme.shadow.shadow2};
  }
`
export const BaseButton: React.FC<IBaseButton> = ({
  children,
  disabled = false,
}) => {
  return (
    <BaseButtonStyled disabled={disabled} type="button">
      {children}
    </BaseButtonStyled>
  )
}

export default BaseButton

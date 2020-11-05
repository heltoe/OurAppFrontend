import React from 'react'
import styled from 'styled-components'

export interface IBaseInput {
  value: string
  type?: string
  placeholder?: string
  disabled?: boolean
  className?: string
  onChange(e: string): void
  onFocus?(e: HTMLInputElement): void
  onBlur?(e: HTMLInputElement): void
}
export const BaseInputStyled = styled.input`
  width: 100%;
  font-size: 16px;
  color: ${(props) => props.theme.rgb(props.theme.colors.black)};
`
export const BaseInput: React.FC<IBaseInput> = ({
  value,
  type = 'text',
  placeholder = '',
  disabled = false,
  onChange,
  onFocus = (e: HTMLInputElement) => {},
  onBlur = (e: HTMLInputElement) => {},
}) => {
  return (
    <BaseInputStyled
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      onFocus={(e) => onFocus(e.target)}
      onBlur={(e) => onBlur(e.target)}
    />
  )
}

export default BaseInput

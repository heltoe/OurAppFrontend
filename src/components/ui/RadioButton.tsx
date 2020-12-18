import React, { useState } from 'react'
import styled from 'styled-components'

type RadioButtonType = {
  name: string
  value: string
  isChecked?: boolean
  onChange(e: string): void
}

export const LabelRadioStyled = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`
const RoundRadioStyled = styled.div<{ checked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-right: 3px;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  border: ${(props) => `2px solid ${props.theme.rgb(props.theme.colors.purple1)}`};
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    border-radius: 50%;
    background-color: ${(props) => props.theme.rgb(props.theme.colors.purple1)};
    transition: ${(props) => `opacity ${props.theme.transition}`};
    opacity: ${(props) => props.checked ? 1 : 0 };
  }
`
const InputRadioStyled = styled.input`
  display: none;
`
const RadioButton: React.FC<RadioButtonType> = ({ children, name, value, isChecked = false, onChange }) => {
  const [isCheck, setCheck] = useState(false)
  const handleChange = (target: HTMLInputElement) => {
    setCheck(target.checked)
    onChange(target.value)
  }
  return (
    <LabelRadioStyled className="no-select">
      <RoundRadioStyled checked={isChecked} />
      <InputRadioStyled
        type="radio"
        name={name}
        value={value}
        checked={isChecked}
        onChange={(e) => handleChange(e.target)}
      />
      {children}
    </LabelRadioStyled>
  )
}

export default RadioButton

import React, { useState } from 'react'
import styled from 'styled-components'
import { IBaseInput, BaseInputStyled } from '@/components/ui/BaseInput'

interface IFormInput extends IBaseInput {
  error?: string
}
const LabelStyled = styled.label`
  position: relative;
`
const PlaceholderStyled = styled.p<{ filled: boolean }>`
  font-size: 13px;
  font-weight: 300;
  color: ${(props) => props.theme.rgb(props.theme.colors.black)};
  position: absolute;
  top: ${(props) => (props.filled ? '15px' : '50%')};
  left: 15px;
  transform: translateY(-50%);
  transition: ${(props) => props.theme.transition};
`
const FormInputStyled = styled(BaseInputStyled)<{ filled: boolean }>`
  border-radius: 8px;
  padding: 28px 15px 13px;
  border-width: 1px;
  border-style: solid;
  transition: ${(props) => props.theme.transition};
  background-color: ${(props) =>
    props.theme.rgb(props.theme.colors[props.filled ? 'white' : 'grey3'])};
  border-color: ${(props) =>
    props.theme.rgba(props.theme.colors.grey4, props.filled ? 1 : 0)};
  box-shadow: ${(props) =>
    props.filled ? props.theme.shadow.shadow2 : 'none'};
`
export const FormInput: React.FC<IFormInput> = ({
  value,
  type = 'text',
  placeholder = '',
  disabled = false,
  error = '',
  onChange,
  onFocus = (e: HTMLInputElement): void => {},
  onBlur = (e: HTMLInputElement): void => {},
}) => {
  const [activeInput, setActiveInput] = useState(false)
  const handlerChange = (str: string) => {
    if (!value.length) setActiveInput(true)
    onChange(str)
  }
  const handlerFocus = (e: HTMLInputElement) => {
    if (!value.length) setActiveInput(true)
    onFocus(e)
  }
  const handlerBlur = (e: HTMLInputElement) => {
    if (!value.length) setActiveInput(false)
    onBlur(e)
  }
  return (
    <LabelStyled>
      <PlaceholderStyled filled={activeInput}>{placeholder}</PlaceholderStyled>
      <FormInputStyled
        type={type}
        value={value}
        placeholder=""
        disabled={disabled}
        filled={activeInput}
        onChange={(e) => handlerChange(e.target.value)}
        onFocus={(e) => handlerFocus(e.target)}
        onBlur={(e) => handlerBlur(e.target)}
      />
    </LabelStyled>
  )
}

export default FormInput

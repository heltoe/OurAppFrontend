import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { IBaseInput, BaseInputStyled } from '@/components/ui/BaseInput'
import FadeInOut from '@/components/ui/FadeInOut'

interface IFormInput extends IBaseInput {
  error?: string
}
export const LabelStyled = styled.label<{ error: string }>`
  position: relative;
  transition: ${(props) => props.theme.transition};
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) =>
    props.theme.rgba(props.theme.colors.red, props.error && props.error.length ? 1 : 0)};
  box-shadow: ${(props) =>
    props.error && props.error.length ? props.theme.shadow.shadow3 : 'none'};
  border-radius: 8px;
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
export const FormInputStyled = styled(BaseInputStyled)<{ filled: boolean }>`
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
export const ErrorMessageStyled = styled.div`
  max-width: 235px;
  font-size: 14px;
  line-height: 1.3;
  position: absolute;
  right: -15px;
  top: 50%;
  transform: translate(100%, -50%);
  background-color: ${(props) => props.theme.rgb(props.theme.colors.red)};
  color:${(props) => props.theme.rgb(props.theme.colors.white)};
  box-shadow: ${(props) => props.theme.shadow.shadow1};
  padding: 10px;
  border-radius: 8px;
  &:after {
    content: '';
    position: absolute;
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
    border: 7px solid transparent;
    border-right: ${(props) => `15px solid ${props.theme.rgb(props.theme.colors.red)}`};
  }
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
    if (typeof value === 'string' && !value.length) setActiveInput(true)
    onChange(`${str}`)
  }
  const handlerFocus = (e: HTMLInputElement) => {
    if (typeof value === 'string' && !value.length) setActiveInput(true)
    onFocus(e)
  }
  const handlerBlur = (e: HTMLInputElement) => {
    if (typeof value === 'string' && !value.length) setActiveInput(false)
    onBlur(e)
  }
  useEffect(() => {
    if (value && !activeInput) setActiveInput(true)
  }, [value])
  return (
    <LabelStyled error={error}>
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
      {error && error.length && <FadeInOut><ErrorMessageStyled>{error}</ErrorMessageStyled></FadeInOut>}
    </LabelStyled>
  )
}

export default FormInput

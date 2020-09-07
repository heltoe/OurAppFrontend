import React, { useState } from 'react'
import { IBaseInput } from '@/components/ui/input/BaseInput'
import style from '@/components/ui/input/input.module.scss'
import BaseInput from './BaseInput'

interface IFormInput extends IBaseInput {
  error?: string
}

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
  const [activeInputStyle, setStyleInput] = useState(style['empty-input'])
  const [activePlaceholderStyle, setStylePlaceholder] = useState('')
  // handlers
  const handlerChange = (str: string) => {
    if (!value.length) activeInput()
    onChange(str)
  }
  const handlerFocus = (e: HTMLInputElement) => {
    if (!value.length) activeInput()
    onFocus(e)
  }
  const handlerBlur = (e: HTMLInputElement) => {
    if (!value.length) passiveInput()
    onBlur(e)
  }
  // class helpers
  const activeInput = () => {
    if (activeInputStyle !== style['filled-input'])
      setStyleInput(style['filled-input'])
    if (activePlaceholderStyle !== style.filled)
      setStylePlaceholder(style.filled)
  }
  const passiveInput = () => {
    if (activeInputStyle !== style['empty-input'])
      setStyleInput(style['empty-input'])
    if (activePlaceholderStyle !== '') setStylePlaceholder('')
  }
  return (
    <label className={style.label}>
      <p className={`${style.placeholder} ${activePlaceholderStyle}`}>
        {placeholder}
      </p>
      <BaseInput
        type={type}
        value={value}
        placeholder=""
        disabled={disabled}
        className={`${style['form-input']} ${activeInputStyle}`}
        onChange={(str) => handlerChange(str)}
        onFocus={(e) => handlerFocus(e)}
        onBlur={(e) => handlerBlur(e)}
      />
    </label>
  )
}

export default FormInput

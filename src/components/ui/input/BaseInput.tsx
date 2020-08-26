import React from 'react'
import style from './input.module.scss'

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

export const BaseInput: React.FC<IBaseInput> = ({
  value,
  type = 'text',
  placeholder = '',
  disabled = false,
  className = '',
  onChange,
  onFocus = (e: HTMLInputElement) => {},
  onBlur = (e: HTMLInputElement) => {}
}) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      className={`${style.input} ${className}`}
      onChange={e => onChange(e.target.value)}
      onFocus={(e) => onFocus(e.target)}
      onBlur={(e) => onBlur(e.target)}
    />
  )
}

export default BaseInput

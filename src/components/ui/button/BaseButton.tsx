import React from 'react'
import style from './button.module.scss'

export interface IBaseButton {
  disabled?: boolean
}

export const BaseButton: React.FC<IBaseButton> = ({
  children,
  disabled = false,
}) => {
  return (
    <button disabled={disabled} type="button" className={style.button}>
      {children}
    </button>
  )
}

export default BaseButton

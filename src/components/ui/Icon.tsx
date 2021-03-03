import React from 'react'
import styled from 'styled-components'
import Sprite from '@/assets/icons/sprite.svg'

type IconType = {
  color?: string
  size?: string
  viewBox?: string
  type: string
  onClick?(): void
}

export const IconStyled = styled.div`
  & use {
    transition: ${(props) => props.theme.transition}
  }
`

export const Icon: React.FC<IconType> = ({
  color = '#cccccc',
  size = '24px',
  viewBox = '0 0 64 64',
  type,
  onClick = () => {}
}) => {
  const spritepath = `${Sprite}#${type}`
  return (
    <IconStyled className="no-select" onClick={() => onClick()}>
      <svg viewBox={viewBox} width={size} height={size}>
        <use xlinkHref={spritepath} fill={color} />
      </svg>
    </IconStyled>
  )
}

export default Icon

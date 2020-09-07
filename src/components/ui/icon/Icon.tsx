import React from 'react'
import Sprite from '@/assets/icons/sprite.svg'

type IconType = {
  color?: string
  size?: string
  viewBox?: string
  type: string
}

export const Icon: React.FC<IconType> = ({
  color = '#cccccc',
  size = '24px',
  viewBox = '0 0 64 64',
  type,
}) => {
  const spritepath = `${Sprite}#${type}`
  return (
    <div className="no-select">
      <svg viewBox={viewBox} width={size} height={size}>
        <use xlinkHref={spritepath} fill={color} />
      </svg>
    </div>
  )
}

export default Icon

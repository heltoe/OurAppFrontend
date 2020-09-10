import React from 'react'
import style from '@/components/ui/avatar/avatar.module.scss'

type AvatarType = {
  isRound?: boolean
  size?: string
  image?: string
  color?: string
  initials?: string
}

export const Avatar: React.FC<AvatarType> = ({
  image = '',
  size = '30px',
  isRound = false,
  initials = '',
  color = '#9f9f9f',
}) => {
  const classAvatar = isRound
    ? `${style.avatar} ${style['is-round']}`
    : style.avatar
  const styleAvatar = {
    width: size,
    height: size,
    backgroundImage: `url(${image})`,
    backgroundColor: color,
  }
  return (
    <div className={classAvatar} style={styleAvatar}>
      {image.length ? (
        ''
      ) : (
        <p className={`no-select ${style.initials}`}>{initials}</p>
      )}
    </div>
  )
}

export default Avatar

import React from 'react'
import Avatar from '@/components/ui/avatar/Avatar'
import style from '@/components/common/header/header.module.scss'

type AvatarStatusType = {
  isOnline?: boolean
  image: string
  initials: string
}

export const AvatarStatus: React.FC<AvatarStatusType> = ({
  isOnline = false,
  image = '',
  initials = '',
}) => {
  return (
    <div className={style['avatar-status']}>
      <Avatar image={image} initials={initials} isRound size="40px" />
      {isOnline ? <span className={style['point-status']} /> : ''}
    </div>
  )
}

export default AvatarStatus
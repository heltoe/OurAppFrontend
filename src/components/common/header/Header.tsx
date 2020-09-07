import React from 'react'
import { Link } from 'react-router-dom'
import { getRouterByName } from '@/routes'
import AvatarStatus from '@/components/common/header/AvatarStatus'
import BackPage from '@/components/ui/back-page/Back'
import style from '@/components/common/header/header.module.scss'

export const Header: React.FC = () => {
  return (
    <div className={style.header}>
      <BackPage path="/" />
      <p className={`no-select ${style.logo}`}>Chat</p>
      <Link
        to={getRouterByName('profile-page').path}
        className={style['person-info']}
      >
        <AvatarStatus image="" initials="" />
      </Link>
    </div>
  )
}

export default Header

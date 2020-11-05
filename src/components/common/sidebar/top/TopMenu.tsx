import React from 'react'
import { Link } from 'react-router-dom'
import { getRouterByName } from '@/routes'
import Icon from '@/components/ui/Icon'
import style from '../sidebar.module.scss'

export const TopMenu: React.FC = () => {
  const greyColor = '#f3f3f3'
  return (
    <div className={style['top-menu']}>
      <Link
        to={getRouterByName('profile-page').path}
        className={style['top-menu__link']}
      >
        <Icon type="profile" size="21px" color={greyColor} />
      </Link>
      <Link
        to={getRouterByName('messages-page').path}
        className={style['top-menu__link']}
      >
        <Icon type="letter" size="25px" color={greyColor} />
      </Link>
      <Link
        to={getRouterByName('friends-page').path}
        className={style['top-menu__link']}
      >
        <Icon type="users" size="25px" color={greyColor} />
      </Link>
    </div>
  )
}

export default TopMenu

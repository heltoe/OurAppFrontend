import React from 'react'
import { Link } from 'react-router-dom'
import { getRouterByName } from '@/routes'
import styles from './toggler-page.module.scss'

type LinkType = {
  routeName: string
  content: string
}
type TogglePageType = {
  routes: LinkType[]
}

export const TogglePage: React.FC<TogglePageType> = ({ routes = [] }) => {
  return (
    <div className={styles['wrapper-toggle-page']}>
      {routes.map((item) => (
        <Link
          key={item.routeName}
          to={getRouterByName(item.routeName).path}
          className={styles['toggle-page']}
        >
          {item.content}
        </Link>
      ))}
    </div>
  )
}

export default TogglePage

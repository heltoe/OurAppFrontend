import React from 'react'
import { Link } from 'react-router-dom'
import { getRouterByName } from '@/routes'
import styles from '@/components/common/footer/components/footer-link.module.scss'

export interface IDataLink {
  routeName: string
}

export const FooterLink: React.FC<IDataLink> = ({ children, routeName }) => {
  return (
    <Link
      to={getRouterByName(routeName).path}
      className={styles['footer-link']}
    >
      {children}
    </Link>
  )
}

export default FooterLink

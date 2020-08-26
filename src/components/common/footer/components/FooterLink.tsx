import React from 'react'
import { Link } from 'react-router-dom'
import styles from './footer-link.module.scss';
import { getRouterByName } from '@/routes'

export interface IDataLink {
  routeName: string
}

export const FooterLink: React.FC<IDataLink> = ({ children, routeName }) => {
  return (
    <Link to={getRouterByName(routeName).path} className={styles['footer-link']}>{children}</Link>
  )
}

export default FooterLink
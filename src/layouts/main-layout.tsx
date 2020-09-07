import React from 'react'
import Header from '@/components/common/header/Header'
import SideBar from '@/components/common/sidebar/SideBar'
import styles from './main-layout.module.scss'

export const MainLayout: React.FC = ({ children }) => {
  return (
    <div className={styles['main-layout']}>
      <SideBar />
      <div className={styles['content-container']}>
        <Header />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}
export default MainLayout

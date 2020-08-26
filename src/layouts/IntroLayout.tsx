import React from 'react'
import Footer from '@/components/common/footer/Footer'
import styles from './intro-layout.module.scss'

export const IntroLayout: React.FC = ({ children }) => {
  return (
    <div className={styles['intro-layout']}>
      {children}
      <Footer />
    </div>
  )
}

export default IntroLayout

import React from 'react'
import styles from './intro-layout.module.scss';
import Footer from '@/components/common/footer/Footer';

console.log(4545)

export const IntroLayout: React.FC = ({children}) => {
  return (
    <div className={styles['intro-layout']}>
      {children}
      <Footer />
    </div>
  )
}

export default IntroLayout
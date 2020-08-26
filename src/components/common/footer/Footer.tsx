import React from 'react'
import styles from './footer.module.scss'
import FooterLink from './components/FooterLink'

export const Footer: React.FC = () => {
  return (
    <div className={`wrapper ${styles.footer}`}>
      <div className={styles['footer-container']}>
        <FooterLink routeName="policy">Политика конфиденциальности</FooterLink>
        <FooterLink routeName="contacts">Контакты</FooterLink>
      </div>
      <p className={styles.copy}>© 2019–2020 ООО «Человек»</p>
    </div>
  )
}

export default Footer

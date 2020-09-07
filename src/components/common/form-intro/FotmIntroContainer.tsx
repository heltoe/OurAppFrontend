import React from 'react'
import styles from '@/components/common/form-intro/form-intro-container.module.scss'

export const FormIntroContainer: React.FC = ({ children }) => {
  return <div className={styles['form-container']}>{children}</div>
}

export default FormIntroContainer

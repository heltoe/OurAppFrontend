import React from 'react'
import styles from '@/components/common/form-intro/form/form.module.scss'

// type FormType = {
//   onSubmit?(e): void
// }

export const FormIntro: React.FC = ({ children }) => {
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
  }
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      {children}
    </form>
  )
}

export default FormIntro

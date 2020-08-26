import React from 'react'
import styles from './form.module.scss';

// type FormType = {
//   onSubmit?(e): void
// }

export const FormIntro: React.FC = ({ children }) => {
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(e)
  }
  return (<form className={styles.form} onSubmit={submitHandler}>{children}</form>)
}

export default FormIntro

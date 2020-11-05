import React, { useState } from 'react'
import BaseButton from '@/components/ui/BaseButton'
import FormInput from '@/components/ui/FormInput'
import Loader from '@/components/ui/Loader'
import style from '@/components/pages/profile/profile.module.scss'

export const ChangePass: React.FC = () => {
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const isLoading = false
  return (
    <div className={style.form}>
      <p className="middle">Изменить пароль</p>
      <FormInput
        value={password}
        placeholder="Новый пароль"
        onChange={(e) => setPassword(e)}
      />
      <FormInput
        value={repeatPassword}
        placeholder="Повторите новый пароль"
        onChange={(e) => setRepeatPassword(e)}
      />
      <BaseButton>Сохранить</BaseButton>
      {isLoading ? <Loader /> : ''}
    </div>
  )
}

export default ChangePass

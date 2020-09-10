import React, { useState } from 'react'
import BaseButton from '@/components/ui/button/BaseButton'
import FormInput from '@/components/ui/input/FormInput'
import Loader from '@/components/ui/loader/Loader'
import style from '@/components/pages/profile/profile.module.scss'

export const MainInfoForm: React.FC = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const isLoading = false

  return (
    <div className={style.form}>
      <p className="middle">Основная информация</p>
      <FormInput
        value={firstName}
        placeholder="Вашe имя"
        onChange={(e) => setFirstName(e)}
      />
      <FormInput
        value={lastName}
        placeholder="Ваша фамилия"
        onChange={(e) => setLastName(e)}
      />
      <FormInput
        value={email}
        placeholder="Ваш e-mail"
        onChange={(e) => setEmail(e)}
      />
      {/* birthday */}
      <BaseButton>Сохранить</BaseButton>
      {isLoading ? <Loader /> : ''}
    </div>
  )
}

export default MainInfoForm

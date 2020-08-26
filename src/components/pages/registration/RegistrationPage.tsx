import React, { useState } from 'react'
import FormIntroContainer from '@/components/common/form-intro/FotmIntroContainer'
import TogglePage from '@/components/common/form-intro/toggle-page/TogglePage'
import FormIntro from '@/components/common/form-intro/form/FormIntro'
import FormInput from '@/components/ui/input/FormInput'
import BaseButton from '@/components/ui/button/BaseButton'
import style from './registration.module.scss'

export const RegistrationPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  return (
    <FormIntroContainer>
      <FormIntro>
        <FormInput
          value={email}
          placeholder="Ваш e-mail*"
          onChange={(e) => setEmail(e)}
        />
        <FormInput
          value={password}
          type="password"
          placeholder="Пароль*"
          onChange={(e) => setPassword(e)}
        />
        <FormInput
          value={repeatPassword}
          type="password"
          placeholder="Повторите пароль*"
          onChange={(e) => setRepeatPassword(e)}
        />
        <FormInput
          value={firstName}
          placeholder="Имя*"
          onChange={(e) => setFirstName(e)}
        />
        <FormInput
          value={LastName}
          placeholder="Фамилия*"
          onChange={(e) => setLastName(e)}
        />
        <p className={style['required-description']}>
          * Обязательные поля для заполнения
        </p>
        <BaseButton>Зарегестрироваться</BaseButton>
      </FormIntro>
      <TogglePage routes={[{ routeName: 'login-page', content: 'Вход' }]} />
    </FormIntroContainer>
  )
}

export default RegistrationPage

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getRouterByName } from '@/routes'
import FormIntroContainer from '@/components/common/form-intro/FotmIntroContainer'
import TogglePage from '@/components/common/form-intro/toggle-page/TogglePage'
import FormIntro from '@/components/common/form-intro/form/FormIntro'
import FormInput from '@/components/ui/FormInput'
import BaseButton from '@/components/ui/BaseButton'
import style from './login-page.module.scss'

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <FormIntroContainer>
      <FormIntro>
        <FormInput
          value={email}
          placeholder="Ваш e-mail"
          onChange={(e) => setEmail(e)}
        />
        <FormInput
          value={password}
          placeholder="Пароль"
          onChange={(e) => setPassword(e)}
        />
        <Link
          to={getRouterByName('restore-password-page').path}
          className={style.restore}
        >
          Забыли пароль?
        </Link>
        <BaseButton>Войти</BaseButton>
      </FormIntro>
      <TogglePage
        routes={[{ routeName: 'registration-page', content: 'Регистрация' }]}
      />
    </FormIntroContainer>
  )
}

export default LoginPage

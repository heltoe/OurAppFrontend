import React, { useState } from 'react'
import FormIntroContainer from '@/components/common/form-intro/FotmIntroContainer'
import TogglePage from '@/components/common/form-intro/TogglePage'
import FormIntro from '@/components/common/form-intro/FormIntro'
import FormInput from '@/components/ui/FormInput'
import BaseButton from '@/components/ui/BaseButton'

export const RestorePasswordPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const routes = [
    { routeName: 'login-page', content: 'Вход' },
    { routeName: 'registration-page', content: 'Регистрация' },
  ]
  return (
    <FormIntroContainer>
      <FormIntro>
        <FormInput
          value={email}
          onChange={(e) => setEmail(e)}
          placeholder="Ваш e-mail"
        />
        <BaseButton>Восстановить пароль</BaseButton>
      </FormIntro>
      <TogglePage routes={routes} />
    </FormIntroContainer>
  )
}

export default RestorePasswordPage

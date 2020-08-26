import React, { useState } from 'react'
import FormIntroContainer from '@/components/common/form-intro/FotmIntroContainer'
import TogglePage from '@/components/common/form-intro/toggle-page/TogglePage'
import FormIntro from '@/components/common/form-intro/form/FormIntro'
import FormInput from '@/components/ui/input/FormInput'
import BaseButton from '@/components/ui/button/BaseButton'

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

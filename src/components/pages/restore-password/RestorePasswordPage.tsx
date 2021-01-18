import React, { useState } from 'react'
import FormIntroContainer from '@/components/common/form-intro/FotmIntroContainer'
import TogglePage from '@/components/common/form-intro/TogglePage'
import FormIntro from '@/components/common/form-intro/FormIntro'
import FormInput from '@/components/ui/FormInput'
import BaseButton from '@/components/ui/BaseButton'
import { validateEmail } from '@/helpers/helpers'

export const RestorePasswordPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const routes = [
    { routeName: 'login-page', content: 'Вход' },
    { routeName: 'registration-page', content: 'Регистрация' },
  ]
  const showErrors = () => {
    let error = false
    if (!email.length) {
      setEmailError('Поле обязательно к заполнению')
      error = true
    }
    if (email.length && !validateEmail(email)) {
      setEmailError('Не валидный Email')
      if (!error) error = true
    }
    return error
  }
  const onSubmit = () => {
    if (emailError.length) return
    const isError = showErrors()
    if (isError) return
  }
  return (
    <FormIntroContainer>
      <FormIntro onSubmit={() => onSubmit()}>
        <FormInput
          value={email}
          onChange={(e) => setEmail(e)}
          error={emailError}
          placeholder="Ваш e-mail"
          onFocus={() => setEmailError('')}
        />
        <BaseButton
          disabled={emailError.length > 0}
          onClick={() => onSubmit()}
        >
          Восстановить пароль
        </BaseButton>
      </FormIntro>
      <TogglePage routes={routes} />
    </FormIntroContainer>
  )
}

export default RestorePasswordPage

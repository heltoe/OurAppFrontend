import React from 'react'
import { useStore } from 'effector-react'
import {
  $email,
  $emailError,
  emilFormChanged,
  $feedBack,
  $canSubmit,
  validateForm
} from '@/components/pages/restore-password/RestorePassword.model'
import FormIntroContainer from '@/components/common/form-intro/FotmIntroContainer'
import TogglePage from '@/components/common/form-intro/TogglePage'
import FormIntro from '@/components/common/form-intro/FormIntro'
import FormInput from '@/components/ui/FormInput'
import BaseButton from '@/components/ui/BaseButton'

export const RestorePasswordPage: React.FC = () => {
  const email = useStore($email)
  const feedBack = useStore($feedBack)
  const error = useStore($emailError)
  const canSubmit = useStore($canSubmit)
  const routes = [
    { routeName: 'login-page', content: 'Вход' },
    { routeName: 'registration-page', content: 'Регистрация' },
  ]
  return (
    <FormIntroContainer>
      <FormIntro feedBack={feedBack} onSubmit={() => validateForm()}>
        <FormInput
          value={email}
          onChange={(e) => emilFormChanged.email(e)}
          error={error}
          placeholder="Ваш e-mail"
          onFocus={() => emilFormChanged.errorEmail('')}
        />
        <BaseButton
          disabled={canSubmit}
          onClick={() => validateForm()}
        >
          Восстановить пароль
        </BaseButton>
      </FormIntro>
      <TogglePage routes={routes} />
    </FormIntroContainer>
  )
}

export default RestorePasswordPage

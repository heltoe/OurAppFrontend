import React from 'react'
import { useStore } from 'effector-react'
import {
  $email,
  emailChanged,
  $canSubmit,
  $emailError,
  emailErrorChanged,
  validateForm
} from '@/components/pages/restore-password/RestorePassword.model'
import FormIntroContainer from '@/components/common/form-intro/FotmIntroContainer'
import TogglePage from '@/components/common/form-intro/TogglePage'
import FormIntro from '@/components/common/form-intro/FormIntro'
import FormInput from '@/components/ui/FormInput'
import BaseButton from '@/components/ui/BaseButton'

export const RestorePasswordPage: React.FC = () => {
  const email = useStore($email)
  const emailError = useStore($emailError)
  const canSubmit = useStore($canSubmit)
  const routes = [
    { routeName: 'login-page', content: 'Вход' },
    { routeName: 'registration-page', content: 'Регистрация' },
  ]
  return (
    <FormIntroContainer>
      <FormIntro onSubmit={() => validateForm()}>
        <FormInput
          value={email}
          onChange={(e) => emailChanged(e)}
          error={emailError}
          placeholder="Ваш e-mail"
          onFocus={() => emailErrorChanged('')}
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

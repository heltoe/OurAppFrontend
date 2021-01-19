import React from 'react'
import { useStore } from 'effector-react'
import styled from 'styled-components'
import {
  $form,
  $errors,
  $canSubmit,
  emailChanged,
  passwordChanged,
  repeatPasswordChanged,
  firstNameChanged,
  lastNameChanged,
  emailErrorChanged,
  passwordErrorChanged,
  repeatPasswordErrorChanged,
  firstNameErrorChanged,
  lastNameErrorChanged,
  validateForm
} from '@/components/pages/registration/Registration.model'
import FormIntroContainer from '@/components/common/form-intro/FotmIntroContainer'
import TogglePage from '@/components/common/form-intro/TogglePage'
import FormIntro from '@/components/common/form-intro/FormIntro'
import FormInput from '@/components/ui/FormInput'
import BaseButton from '@/components/ui/BaseButton'

export const RequiredDescriptionStyled = styled.p`
  font-size: 12px;
  font-weight: 300;
  color: ${(props) => props.theme.rgb(props.theme.colors.black)};
  margin-top: 15px;
`
export const RegistrationPage: React.FC = () => {
  const form = useStore($form)
  const errors = useStore($errors)
  const canSubmit = useStore($canSubmit)
  const settingsFields = [
    {
      id: 1,
      value: form.email,
      placeholder: "Ваш e-mail*",
      error: errors.emailError,
      onChange: (e: string) => emailChanged(e),
      onFocus: () => emailErrorChanged('')
    },
    {
      id: 2,
      value: form.password,
      placeholder: "Пароль*",
      error: errors.passwordError,
      onChange: (e: string) => passwordChanged(e),
      onFocus: () => passwordErrorChanged('')
    },
    {
      id: 3,
      value: form.repeatPassword,
      placeholder: "Повторите пароль*",
      error: errors.repeatPasswordError,
      onChange: (e: string) => repeatPasswordChanged(e),
      onFocus: () => repeatPasswordErrorChanged('')
    },
    {
      id: 4,
      value: form.firstName,
      placeholder: "Имя*",
      error: errors.firstNameError,
      onChange: (e: string) => firstNameChanged(e),
      onFocus: () => firstNameErrorChanged('')
    },
    {
      id: 5,
      value: form.lastName,
      placeholder: "Фамилия*",
      error: errors.lastNameError,
      onChange: (e: string) => lastNameChanged(e),
      onFocus: () => lastNameErrorChanged('')
    }
  ]
  return (
    <FormIntroContainer>
      <FormIntro onSubmit={() => validateForm()}>
        {settingsFields.map(item => 
          <FormInput
            key={item.id}
            value={item.value}
            placeholder={item.placeholder}
            error={item.error}
            onChange={(e) => item.onChange(e)}
            onFocus={() => item.onFocus()}
          />  
        )}
        <RequiredDescriptionStyled>
          * Обязательные поля для заполнения
        </RequiredDescriptionStyled>
        <BaseButton
          disabled={!canSubmit}
          onClick={() => validateForm()}
        >
          Зарегестрироваться
        </BaseButton>
      </FormIntro>
      <TogglePage routes={[{ routeName: 'login-page', content: 'Вход' }]} />
    </FormIntroContainer>
  )
}

export default RegistrationPage

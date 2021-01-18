import React, { useState } from 'react'
import styled from 'styled-components'
import FormIntroContainer from '@/components/common/form-intro/FotmIntroContainer'
import TogglePage from '@/components/common/form-intro/TogglePage'
import FormIntro from '@/components/common/form-intro/FormIntro'
import FormInput from '@/components/ui/FormInput'
import BaseButton from '@/components/ui/BaseButton'
import { validateEmail } from '@/helpers/helpers'

export const RequiredDescriptionStyled = styled.p`
  font-size: 12px;
  font-weight: 300;
  color: ${(props) => props.theme.rgb(props.theme.colors.black)};
  margin-top: 15px;
`

export const RegistrationPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [repeatPasswordError, setRepeatPasswordError] = useState('')
  const [firstName, setFirstName] = useState('')
  const [firstNameError, setFirstNameError] = useState('')
  const [lastName, setLastName] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const minCountPass = 6
  const minCountName = 2
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
    if (!password.length) {
      setPasswordError('Поле обязательно к заполнению')
      if (!error) error = true
    }
    if (password.length < minCountPass) {
      setPasswordError(`Пароль должен быть минимум ${minCountPass} символов`)
      if (!error) error = true
    }
    if (!repeatPassword.length) {
      setRepeatPasswordError('Поле обязательно к заполнению')
      if (!error) error = true
    }
    if (password.length && repeatPassword.length && password !== repeatPassword) {
      setRepeatPasswordError(`Пароли не совпадают`)
      if (!error) error = true
    }
    if (!firstName.length) {
      setFirstNameError('Поле обязательно к заполнению')
      if (!error) error = true
    }
    if (firstName.length < minCountName) {
      setFirstNameError(`Имя должно быть минимум ${minCountName} символов`)
      if (!error) error = true
    }
    if (!lastName.length) {
      setLastNameError('Поле обязательно к заполнению')
      if (!error) error = true
    }
    if (lastName.length < minCountName) {
      setLastNameError(`Фамилия должна быть минимум ${minCountName} символов`)
      if (!error) error = true
    }
    return error
  }
  const onSubmit = () => {
    if (
        emailError.length
        || passwordError.length
        || repeatPasswordError.length
        || firstNameError.length
        || lastNameError.length
      ) return
    const isError = showErrors()
    if (isError) return
  }
  const settingsFields = [
    {
      id: 1,
      value: email,
      placeholder: "Ваш e-mail*",
      error: emailError,
      onChange: (e: string) => setEmail(e),
      onFocus: () => setEmailError('')
    },
    {
      id: 2,
      value: password,
      placeholder: "Пароль*",
      error: passwordError,
      onChange: (e: string) => setPassword(e),
      onFocus: () => setPasswordError('')
    },
    {
      id: 3,
      value: repeatPassword,
      placeholder: "Повторите пароль*",
      error: repeatPasswordError,
      onChange: (e: string) => setRepeatPassword(e),
      onFocus: () => setRepeatPasswordError('')
    },
    {
      id: 4,
      value: firstName,
      placeholder: "Имя*",
      error: firstNameError,
      onChange: (e: string) => setFirstName(e),
      onFocus: () => setFirstNameError('')
    },
    {
      id: 5,
      value: lastName,
      placeholder: "Фамилия*",
      error: lastNameError,
      onChange: (e: string) => setLastName(e),
      onFocus: () => setLastNameError('')
    }
  ]
  return (
    <FormIntroContainer>
      <FormIntro onSubmit={() => onSubmit()}>
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
          disabled={
            emailError.length > 0
            || passwordError.length > 0
            || repeatPasswordError.length > 0
            || firstNameError.length > 0
            || lastNameError.length > 0
          }
          onClick={() => onSubmit()}
        >
          Зарегестрироваться
        </BaseButton>
      </FormIntro>
      <TogglePage routes={[{ routeName: 'login-page', content: 'Вход' }]} />
    </FormIntroContainer>
  )
}

export default RegistrationPage

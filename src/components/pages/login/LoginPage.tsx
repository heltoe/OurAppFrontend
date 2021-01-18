import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getRouterByName } from '@/routes'
import FormIntroContainer from '@/components/common/form-intro/FotmIntroContainer'
import TogglePage from '@/components/common/form-intro/TogglePage'
import FormIntro from '@/components/common/form-intro/FormIntro'
import FormInput from '@/components/ui/FormInput'
import BaseButton from '@/components/ui/BaseButton'
import { validateEmail } from '@/helpers/helpers'

export const LinkStyled = styled(Link)`
  font-size: 14px;
  font-weight: 300;
  color: ${(props) => props.theme.rgb(props.theme.colors.black)};
  margin-top: 20px;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(90deg, #000, #000 75%, transparent 75%, transparent 100%);
    background-size: 5px 1px;
  }
`
export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const minCountPass = 6
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
    return error
  }
  const onSubmit = () => {
    if (emailError.length || passwordError.length) return
    const isError = showErrors()
    if (isError) return
  }
  return (
    <FormIntroContainer>
      <FormIntro onSubmit={() => onSubmit()}>
        <FormInput
          value={email}
          placeholder="Ваш e-mail"
          error={emailError}
          onChange={(e) => setEmail(e)}
          onFocus={() => setEmailError('')}
        />
        <FormInput
          value={password}
          placeholder="Пароль"
          error={passwordError}
          onChange={(e) => setPassword(e)}
          onFocus={() => setPasswordError('')}
        />
        <LinkStyled to={getRouterByName('restore-password-page').path}>
          Забыли пароль?
        </LinkStyled>
        <BaseButton
          disabled={emailError.length > 0 || passwordError.length > 0}
          onClick={() => onSubmit()}
        >
          Войти
        </BaseButton>
      </FormIntro>
      <TogglePage routes={[{ routeName: 'registration-page', content: 'Регистрация' }]} />
    </FormIntroContainer>
  )
}

export default LoginPage

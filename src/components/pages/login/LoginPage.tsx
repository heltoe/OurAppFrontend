import React, { useEffect } from 'react'
import { useStore } from 'effector-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  $form,
  $feedBack,
  $errors,
  $canSubmit,
  emailChanged,
  passwordChanged,
  emailErrorChanged,
  passwordErrorChanged,
  validateForm,
  resetFields
} from '@/components/pages/login/Login.model'
import { getRouterByName } from '@/routes'
import FormIntroContainer from '@/components/common/form-intro/FotmIntroContainer'
import TogglePage from '@/components/common/form-intro/TogglePage'
import FormIntro from '@/components/common/form-intro/FormIntro'
import FormInput from '@/components/ui/FormInput'
import BaseButton from '@/components/ui/BaseButton'

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
  const form = useStore($form)
  const feedBack = useStore($feedBack)
  const errors = useStore($errors)
  const canSubmit = useStore($canSubmit)
  useEffect(() => {
    return () => {
      resetFields()
    }
  }, [])
  return (
    <FormIntroContainer>
      <FormIntro feedBack={feedBack} onSubmit={() => validateForm()}>
        <FormInput
          value={form.email}
          placeholder="Ваш e-mail"
          error={errors.email}
          onChange={value => emailChanged(value)}
          onFocus={() => emailErrorChanged('')}
        />
        <FormInput
          value={form.password}
          placeholder="Пароль"
          error={errors.password}
          onChange={value => passwordChanged(value)}
          onFocus={() => passwordErrorChanged('')}
        />
        <LinkStyled to={getRouterByName('restore-password-page').path}>
          Забыли пароль?
        </LinkStyled>
        <BaseButton
          disabled={!canSubmit}
          onClick={() => validateForm()}
        >
          Войти
        </BaseButton>
      </FormIntro>
      <TogglePage routes={[{ routeName: 'registration-page', content: 'Регистрация' }]} />
    </FormIntroContainer>
  )
}

export default LoginPage

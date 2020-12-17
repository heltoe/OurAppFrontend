import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
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
        <LinkStyled to={getRouterByName('restore-password-page').path}>
          Забыли пароль?
        </LinkStyled>
        <BaseButton>Войти</BaseButton>
      </FormIntro>
      <TogglePage routes={[{ routeName: 'registration-page', content: 'Регистрация' }]} />
    </FormIntroContainer>
  )
}

export default LoginPage

import React, { useState } from 'react'
import styled from 'styled-components'
import FormIntroContainer from '@/components/common/form-intro/FotmIntroContainer'
import TogglePage from '@/components/common/form-intro/TogglePage'
import FormIntro from '@/components/common/form-intro/FormIntro'
import FormInput from '@/components/ui/FormInput'
import BaseButton from '@/components/ui/BaseButton'

export const RequiredDescriptionStyled = styled.button`
  font-size: 12px;
  font-weight: 300;
  color: ${(props) => props.theme.rgb(props.theme.colors.black)};
  margin-top: 15px;
`

export const RegistrationPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  return (
    <FormIntroContainer>
      <FormIntro>
        <FormInput
          value={email}
          placeholder="Ваш e-mail*"
          onChange={(e) => setEmail(e)}
        />
        <FormInput
          value={password}
          type="password"
          placeholder="Пароль*"
          onChange={(e) => setPassword(e)}
        />
        <FormInput
          value={repeatPassword}
          type="password"
          placeholder="Повторите пароль*"
          onChange={(e) => setRepeatPassword(e)}
        />
        <FormInput
          value={firstName}
          placeholder="Имя*"
          onChange={(e) => setFirstName(e)}
        />
        <FormInput
          value={LastName}
          placeholder="Фамилия*"
          onChange={(e) => setLastName(e)}
        />
        <RequiredDescriptionStyled>
          * Обязательные поля для заполнения
        </RequiredDescriptionStyled>
        <BaseButton>Зарегестрироваться</BaseButton>
      </FormIntro>
      <TogglePage routes={[{ routeName: 'login-page', content: 'Вход' }]} />
    </FormIntroContainer>
  )
}

export default RegistrationPage

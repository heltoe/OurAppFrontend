import React, { useState } from 'react'
import styled from 'styled-components'
import BaseButton, { BaseButtonStyled } from '@/components/ui/BaseButton'
import FormInput, { LabelStyled, FormInputStyled } from '@/components/ui/FormInput'
import Loader from '@/components/ui/Loader'

export const FormStyled = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  & ${LabelStyled} {
    margin-top: 20px;
    ${FormInputStyled} {
      background-color: ${(props) => props.theme.rgb(props.theme.colors.white)};
    }
  }
  & ${BaseButtonStyled} {
    margin-top: 20px;
    margin-left: auto;
  }
  &:not(:first-child) {
    margin-top: 30px;
  }
`

export const MainInfoForm: React.FC = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const isLoading = false

  return (
    <FormStyled>
      <p className="middle">Основная информация</p>
      <FormInput
        value={firstName}
        placeholder="Вашe имя"
        onChange={(e) => setFirstName(e)}
      />
      <FormInput
        value={lastName}
        placeholder="Ваша фамилия"
        onChange={(e) => setLastName(e)}
      />
      <FormInput
        value={email}
        placeholder="Ваш e-mail"
        onChange={(e) => setEmail(e)}
      />
      {/* birthday */}
      <BaseButton>Сохранить</BaseButton>
      {isLoading ? <Loader /> : ''}
    </FormStyled>
  )
}

export default MainInfoForm

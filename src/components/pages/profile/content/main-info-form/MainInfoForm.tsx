import React from 'react'
import { useStore } from 'effector-react'
import styled from 'styled-components'
import {
  $mainInfoForm,
  $mainInfoFormErrors,
  mainInfoFormChanged,
  mainInfoFormErrorsChanged,
  $isChanged
} from '@/components/pages/profile/content/main-info-form/MainInfoForm.model'
import BaseButton, { BaseButtonStyled } from '@/components/ui/BaseButton'
import FormInput, { LabelStyled, FormInputStyled } from '@/components/ui/FormInput'
import Loader from '@/components/ui/Loader'
import DatePicker from '@/components/ui/DatePicker'

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
  const form = useStore($mainInfoForm)
  const errors = useStore($mainInfoFormErrors)
  const isChanged = useStore($isChanged)
  return (
    <FormStyled>
      <p className="middle">Основная информация</p>
      <FormInput
        value={form.first_name}
        error={errors.firstNameError}
        placeholder="Вашe имя"
        onChange={(e) => mainInfoFormChanged.firstName(e)}
        onFocus={() => mainInfoFormErrorsChanged.firstNameError('')}
      />
      <FormInput
        value={form.last_name}
        error={errors.lastNameError}
        placeholder="Ваша фамилия"
        onChange={(e) => mainInfoFormChanged.lastName(e)}
        onFocus={() => mainInfoFormErrorsChanged.lastNameError('')}
      />
      <FormInput
        value={form.email}
        error={errors.emailError}
        placeholder="Ваш e-mail"
        onChange={(e) => mainInfoFormChanged.email(e)}
        onFocus={() => mainInfoFormErrorsChanged.emailError('')}
      />
      <FormInput
        type={'tel'}
        value={form.phone}
        error={errors.phoneError}
        placeholder="Ваш номер телефона"
        onChange={(e) => mainInfoFormChanged.phone(e)}
        onFocus={() => mainInfoFormErrorsChanged.phoneError('')}
      />
      <DatePicker
        value={form.birth_date}
        placeholder={'Дата рождения'}
        error={errors.birthDateError}
        onChange={(e) => mainInfoFormChanged.birthDate(e)}
      />
        {/* onFocus={() => mainInfoFormErrorsChanged.birthDateError('')} */}
      {isChanged && <BaseButton>Сохранить</BaseButton>}
      {false ? <Loader /> : ''}
    </FormStyled>
  )
}

export default MainInfoForm

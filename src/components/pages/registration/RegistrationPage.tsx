import React from 'react'
import { useStore } from 'effector-react'
import styled from 'styled-components'
import {
  $form,
  $feedBack,
  $errors,
  $canSubmit,
  formChanged,
  validateForm
} from '@/components/pages/registration/Registration.model'
import FormIntroContainer from '@/components/common/form-intro/FotmIntroContainer'
import TogglePage from '@/components/common/form-intro/TogglePage'
import FormIntro from '@/components/common/form-intro/FormIntro'
import FormInput, { ErrorMessageStyled } from '@/components/ui/FormInput'
import BaseButton from '@/components/ui/BaseButton'
import FadeInOut from '@/components/ui/FadeInOut'
import RadioButton, { LabelRadioStyled } from '@/components/ui/RadioButton'
import DatePicker from '@/components/ui/DatePicker'

export const RequiredDescriptionStyled = styled.p`
  font-size: 12px;
  font-weight: 300;
  color: ${(props) => props.theme.rgb(props.theme.colors.black)};
  margin-top: 15px;
`
const GenderRowStyled = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
  position: relative;
  ${LabelRadioStyled} {
    margin-left: 10px;
  }
`
export const RegistrationPage: React.FC = () => {
  const form = useStore($form)
  const errors = useStore($errors)
  const canSubmit = useStore($canSubmit)
  const feedBack = useStore($feedBack)
  const settingsFields = [
    {
      id: 1,
      value: form.email,
      placeholder: 'Ваш e-mail*',
      type: 'email',
      error: errors.emailError,
      onChange: (e: string) => formChanged.email(e),
      onFocus: () => formChanged.emailError('')
    },
    {
      id: 2,
      value: form.password,
      placeholder: 'Пароль*',
      type: 'password',
      error: errors.passwordError,
      onChange: (e: string) => formChanged.password(e),
      onFocus: () => formChanged.passwordError('')
    },
    {
      id: 3,
      value: form.repeat_password,
      placeholder: 'Повторите пароль*',
      type: 'password',
      error: errors.repeatPasswordError,
      onChange: (e: string) => formChanged.repeatPassword(e),
      onFocus: () => formChanged.repeatPasswordError('')
    },
    {
      id: 4,
      value: form.first_name,
      placeholder: 'Имя*',
      type: 'text',
      error: errors.firstNameError,
      onChange: (e: string) => formChanged.firstName(e),
      onFocus: () => formChanged.firstNameError('')
    },
    {
      id: 5,
      value: form.last_name,
      placeholder: 'Фамилия*',
      type: 'text',
      error: errors.lastNameError,
      onChange: (e: string) => formChanged.lastName(e),
      onFocus: () => formChanged.lastNameError('')
    },
    {
      id: 6,
      value: form.phone,
      placeholder: 'Телефон*',
      type: 'tel',
      error: errors.phoneError,
      onChange: (e: string) => formChanged.phone(e),
      onFocus: () => formChanged.phoneError('')
    }
  ]
  return (
    <FormIntroContainer>
      <FormIntro feedBack={feedBack} onSubmit={() => validateForm()}>
        {settingsFields.map(item => 
          <FormInput
            key={item.id}
            type={item.type}
            value={item.value}
            placeholder={item.placeholder}
            error={item.error}
            onChange={(e) => item.onChange(e)}
            onFocus={() => item.onFocus()}
          />
        )}
        <DatePicker
          value={form.birth_date}
          placeholder={'Дата рождения'}
          error={errors.birthDateError}
          onChange={(e) => formChanged.birthDate(e)}
        />
        <GenderRowStyled>
          <p>Пол*:</p>
          <RadioButton
            name="gender"
            value="male"
            isChecked={form.gender === 'male'}
            onChange={(e) => formChanged.gender(e)}
          >
            Мужской
          </RadioButton>
          <RadioButton
            name="gender"
            value="female"
            isChecked={form.gender === 'female'}
            onChange={(e) => formChanged.gender(e)}
          >
            Женский
          </RadioButton>
          {errors.genderError && errors.genderError.length && <FadeInOut><ErrorMessageStyled>{errors.genderError}</ErrorMessageStyled></FadeInOut>}
        </GenderRowStyled>
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

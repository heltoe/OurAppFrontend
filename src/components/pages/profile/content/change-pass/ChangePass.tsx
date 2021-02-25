import React from 'react'
import { useStore } from 'effector-react'
import {
  $password,
  $repassword,
  passwordChanged,
  repasswordChanged,
  $isChanged
} from '@/components/pages/profile/content/change-pass/ChangePass.model'
import BaseButton from '@/components/ui/BaseButton'
import FormInput from '@/components/ui/FormInput'
import Loader from '@/components/ui/Loader'
import { FormStyled } from '@/components/pages/profile/content/main-info-form/MainInfoForm'

export const ChangePass: React.FC = () => {
  const isLoading = false
  const password = useStore($password)
  const repassword = useStore($repassword)
  const isChanged = useStore($isChanged)
  return (
    <FormStyled>
      <p className="middle">Изменить пароль</p>
      <FormInput
        value={password}
        placeholder="Новый пароль"
        onChange={(e) => passwordChanged(e)}
      />
      <FormInput
        value={repassword}
        placeholder="Повторите новый пароль"
        onChange={(e) => repasswordChanged(e)}
      />
      {isChanged && <BaseButton>Сохранить</BaseButton>}
      {isLoading ? <Loader /> : ''}
    </FormStyled>
  )
}

export default ChangePass

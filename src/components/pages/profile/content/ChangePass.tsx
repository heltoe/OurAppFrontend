import React, { useState } from 'react'
import BaseButton from '@/components/ui/BaseButton'
import FormInput from '@/components/ui/FormInput'
import Loader from '@/components/ui/Loader'
import { FormStyled } from '@/components/pages/profile/content/MainInfoForm'

export const ChangePass: React.FC = () => {
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const isLoading = false
  return (
    <FormStyled>
      <p className="middle">Изменить пароль</p>
      <FormInput
        value={password}
        placeholder="Новый пароль"
        onChange={(e) => setPassword(e)}
      />
      <FormInput
        value={repeatPassword}
        placeholder="Повторите новый пароль"
        onChange={(e) => setRepeatPassword(e)}
      />
      <BaseButton>Сохранить</BaseButton>
      {isLoading ? <Loader /> : ''}
    </FormStyled>
  )
}

export default ChangePass

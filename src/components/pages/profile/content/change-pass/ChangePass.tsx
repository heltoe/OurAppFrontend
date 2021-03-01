import React from 'react'
import { useStore } from 'effector-react'
import {
  $form,
  $errorsForm,
  formMethods,
  $isChanged,
  $disabledBtn,
  submitRequestPersonalInfoFx,
  validateForm
} from '@/components/pages/profile/content/change-pass/ChangePass.model'
import BaseButton from '@/components/ui/BaseButton'
import FormInput from '@/components/ui/FormInput'
import Loader from '@/components/ui/Loader'
import { FormStyled } from '@/components/pages/profile/content/main-info-form/MainInfoForm'
import { FeedBackMessageStyled } from '@/components/common/form-intro/FormIntro'

export const ChangePass: React.FC = () => {
  const form = useStore($form)
  const formErrors = useStore($errorsForm)
  const isChanged = useStore($isChanged)
  const isDisabled = useStore($disabledBtn)
  const isPending = useStore(submitRequestPersonalInfoFx.pending)
  return (
    <FormStyled>
      <p className="middle">Изменить пароль</p>
      <FormInput
        value={form.password}
        error={formErrors.password}
        placeholder="Новый пароль"
        onChange={(e) => formMethods.password(e)}
        onFocus={() => formMethods.passwordErr('')}
      />
      <FormInput
        value={form.repassword}
        error={formErrors.repassword}
        placeholder="Повторите новый пароль"
        onChange={(e) => formMethods.repassword(e)}
        onFocus={() => formMethods.repasswordErr('')}
      />
      {formErrors.errorFrom && formErrors.errorFrom.length && <FeedBackMessageStyled>{formErrors.errorFrom}</FeedBackMessageStyled>}
      {isChanged && <BaseButton disabled={isDisabled} onClick={() => validateForm()}>Сохранить</BaseButton>}
      {isPending ? <Loader /> : ''}
    </FormStyled>
  )
}

export default ChangePass

import { combine, attach, createEvent, sample, createEffect, guard, forward } from 'effector-root'
import { createEffectorField } from '@/helpers/effector-field'
import { ChangePasswordFxParams } from '@/api/types'
import { ChangePasswordFx } from '@/api/Profile'
import { validatorForm } from '@/helpers/validator'
import { $combinePersonalData } from '@/App.module'

// эффекты
export const submitRequestPersonalInfoFx = attach({
  effect: ChangePasswordFx,
  mapParams: (params: ChangePasswordFxParams) => params
})
const validateFormFx = createEffect((params: { password: string, repassword: string}) => {
  const passwordErr = validatorForm({ value: params.password, minSize: 6 })
  let repasswordErr = validatorForm({ value: params.repassword })
  if (!repasswordErr.length) repasswordErr = params.password === params.repassword ? '' : 'Пароли не совпадают'
  if (!passwordErr.length && !repasswordErr.length) return submitForm()
  passwordErrChanged(passwordErr)
  repasswordErrChanged(repasswordErr)
})

// события
export const validateForm = createEvent()
const submitForm = createEvent()

// сторы
const [$password, passwordChanged] = createEffectorField({ defaultValue: '' })
const [$passwordErr, passwordErrChanged] = createEffectorField({ defaultValue: '' })
const [$repassword, repasswordChanged] = createEffectorField({ defaultValue: '' })
const [$repasswordErr, repasswordErrChanged] = createEffectorField({ defaultValue: '' })
const [$errorForm, errorFormChanged] = createEffectorField({ defaultValue: '' })
export const $form = combine({ password: $password, repassword: $repassword })
export const $errorsForm = combine({ password: $passwordErr, repassword: $repasswordErr, errorFrom: $errorForm })
export const formMethods = {
  password: passwordChanged,
  repassword: repasswordChanged,
  passwordErr: passwordErrChanged,
  repasswordErr: repasswordErrChanged
}
export const $isChanged = combine($password, $repassword, (password, repassword) => password.length > 0 || repassword.length > 0)
export const $disabledBtn = combine($passwordErr, $repasswordErr, (passwordErr, repasswordErr) => passwordErr.length !== 0 && repasswordErr.length !== 0)

export const $canSubmit = combine($form, $errorsForm, submitRequestPersonalInfoFx.pending, (form, errorsForm, pending) => 
  form.password.length !== 0
  && form.repassword.length !== 0
  && errorsForm.password.length === 0
  && errorsForm.repassword.length === 0
  && !pending
)
const $paramsTosend = combine($password, $combinePersonalData, (password, personData) => ({
  user_id: personData.id,
  token: personData.token,
  password
}))

// методы
sample({
  clock: validateForm,
  source: $form,
  target: validateFormFx
})
sample({
  clock: submitForm,
  source: guard({ source: $paramsTosend, filter: $canSubmit }),
  target: submitRequestPersonalInfoFx
})
forward({
  from: submitRequestPersonalInfoFx.failData,
  to: errorFormChanged.prepend(() => 'Сервис временно не работает'),
})
forward({
  from: submitRequestPersonalInfoFx.doneData,
  to: [
    errorFormChanged.prepend(() => ''),
    passwordChanged.prepend(() => ''),
    repasswordChanged.prepend(() => '')
  ]
})
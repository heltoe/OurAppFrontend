import { attach, combine, createEvent, sample, guard, forward, createEffect } from 'effector-root'
import { LoginFx } from '@/api/Login'
import { LoginFxParams } from '@/api/types'
import { createEffectorField } from '@/helpers/effector-field'
import { validatorForm } from '@/helpers/validator'

// эффекты
const validateFormFx = createEffect((params: LoginFxParams) => {
  const emailErr = validatorForm(params.email, true)
  const passErr = validatorForm(params.password, false, 6)
  if (!emailErr.length && !passErr.length ) return submitForm()
  emailErrorChanged(emailErr)
  passwordErrorChanged(passErr)
})
export const submitFormFx = attach({
  effect: LoginFx,
  mapParams: (params: any) => params
})
// events
export const validateForm = createEvent()
export const submitForm = createEvent()
// сторы
export const [$email, emailChanged] = createEffectorField({ defaultValue: '' })
export const [$password, passwordChanged] = createEffectorField({ defaultValue: '' })
export const [$emailError, emailErrorChanged] = createEffectorField({ defaultValue: '' })
export const [$passwordError, passwordErrorChanged] = createEffectorField({ defaultValue: '' })
export const $form = combine({ email: $email, password: $password })
export const $errors = combine({ email: $emailError, password: $passwordError })
const $isFormValid = combine(
  $email,
  $password,
  $emailError,
  $passwordError,
  (email, password, emailError, passwordError) => email.length > 0 || password.length > 0 || emailError.length === 0 || passwordError.length === 0
)
export const $canSubmit = combine(
  $isFormValid,
  submitFormFx.pending,
  (isFormValid, sendFormPending) => isFormValid && !sendFormPending
)
// методы
sample({
  source: $form,
  clock: validateForm,
  target: validateFormFx
})
sample({
  source: $form,
  clock: guard({ source: submitForm, filter: $canSubmit }),
  target: submitFormFx
})
// forward юзаем после запроса
// forward({
//   from: submitFormFx.doneData,
//   to: addToast.prepend(() => ({ type: 'error', message: 'Пользователь не найден' })),
// })
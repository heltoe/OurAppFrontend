import { attach, combine, createEvent, sample, guard, forward, createEffect } from 'effector-root'
import { LoginFx } from '@/api/Login'
import { LoginFxParams } from '@/api/types'
import { createEffectorField } from '@/helpers/effector-field'
import { navigatePush } from '@/helpers/navigation'
import { validatorForm } from '@/helpers/validator'
import { getRouterByName } from '@/routes'
import { setTokenForRequest, setRefreshTokenForRequest } from '@/api/common/AuthorizedRequest'

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
  mapParams: (params: LoginFxParams) => {
    feedBackChanged('')
    return params
  }
})
const setErrorFx = createEffect((data: any) => {
  feedBackChanged(data.body.code === 'invalid_data' ? 'Введены не корректные Email или пароль' : 'Сервис временно не работает...')
})
// events
export const validateForm = createEvent()
export const submitForm = createEvent()
const resetFields = createEvent()
// сторы
export const [$email, emailChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$password, passwordChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$feedBack, feedBackChanged] = createEffectorField({ defaultValue: '' })
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
  source: guard({ source: $form, filter: $canSubmit }),
  clock: submitForm,
  target: submitFormFx
})
forward({
  from: submitFormFx.failData,
  to: setErrorFx
})
forward({
  from: submitFormFx.doneData,
  to: [
    setTokenForRequest.prepend(({ body }: any) => body.accessToken),
    setRefreshTokenForRequest.prepend(({ body }: any) => body.refreshToken),
    navigatePush.prepend(() => ({ pathname: getRouterByName('profile-page').path })),
    resetFields
  ]
})

import { combine, createEvent, createEffect, sample, guard, attach, forward } from 'effector-root'
import { RestoreFx } from '@/api/RestorePassword'
import { RestorePasswordFxParams } from '@/api/types'
import { createEffectorField } from '@/helpers/effector-field'
import { navigatePush } from '@/helpers/navigation'
import { validatorForm } from '@/helpers/validator'
import { getRouterByName } from '@/routes'

// эффекты
const validateFormFx = createEffect((params: RestorePasswordFxParams) => {
  const errorEmail = validatorForm(params.email, true)
  !errorEmail.length ? submitForm() : emailErrorChanged(errorEmail)
})
const submitFormFx = attach({
  effect: RestoreFx,
  mapParams: (params: any) => {
    feedBackChanged('')
    return params
  }
})
const setErrorFx = createEffect(() => feedBackChanged('Сервис временно не работает...'))
// events
export const validateForm = createEvent()
export const submitForm = createEvent()
const resetFields = createEvent()
// сторы
export const [$email, emailChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$feedBack, feedBackChanged] = createEffectorField({ defaultValue: '' })
export const [$emailError, emailErrorChanged] = createEffectorField({ defaultValue: '' })
export const emilFormChanged = {
  email: emailChanged,
  errorEmail: emailErrorChanged
}
export const $canSubmit = combine(
  $email,
  $emailError,
  (email, emailError) => email.length > 0 && emailError.length === 0
)
// методы
sample({
  clock: validateForm,
  source: { email: $email },
  target: validateFormFx
})
sample({
  clock: submitForm,
  source: guard({ source: $email, filter: $canSubmit }),
  target: submitFormFx
})
forward({
  from: submitFormFx.failData,
  to: setErrorFx
})
forward({
  from: submitFormFx.doneData,
  to: [navigatePush.prepend(() => ({ pathname: getRouterByName('login-page').path })), resetFields]
})

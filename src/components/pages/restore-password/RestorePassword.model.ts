import { combine, createEvent, createEffect, sample, guard, attach, forward } from 'effector-root'
import { RestoreFx } from '@/api/RestorePassword'
import { RestorePasswordFxParams } from '@/api/types'
import { createEffectorField } from '@/helpers/effector-field'
import { validatorForm } from '@/helpers/validator'

// эффекты
const validateFormFx = createEffect((params: RestorePasswordFxParams) => {
  const errorEmail = validatorForm(params.email, true)
  !errorEmail.length ? submitForm() : emailErrorChanged(errorEmail)
})
const submitFormFx = attach({
  effect: RestoreFx,
  mapParams: (params: any) => params
})
// events
export const validateForm = createEvent()
export const submitForm = createEvent()
// сторы
export const [$email, emailChanged] = createEffectorField({ defaultValue: '' })
export const [$emailError, emailErrorChanged] = createEffectorField({ defaultValue: '' })
export const $canSubmit = combine(
  $email,
  $emailError,
  (email, emailError) => email.length > 0 && emailError.length === 0
)
// методы
sample({
  source: { email: $email },
  clock: validateForm,
  target: validateFormFx
})
sample({
  source: guard({ source: $email, filter: $canSubmit }),
  clock: validateForm,
  target: submitFormFx
})
// forward юзаем после запроса
// forward({
//   from: submitFormFx.doneData,
//   to: addToast.prepend(() => ({ type: 'error', message: 'Пользователь не найден' })),
// })
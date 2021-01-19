import { createEvent, createEffect, attach, combine, sample, guard } from 'effector-root'
import { RegistrationFx } from '@/api/Registration'
import { RegistrationFxParams } from '@/api/types'
import { createEffectorField } from '@/helpers/effector-field'
import { validatorForm } from '@/helpers/validator'

// эффекты
const validateFormFx = createEffect((params: RegistrationFxParams) => {
  const emailErr = validatorForm(params.email, true)
  const passErr = validatorForm(params.password, false, 6)
  const repeatPasswordErr = validatorForm(params.repeatPassword, false)
  const firstName = validatorForm(params.firstName, false, 2)
  const lastName = validatorForm(params.lastName, false, 2)
  if (
    !emailErr.length
    && !passErr.length
    && !repeatPasswordErr.length
    && !firstName.length
    && !lastName.length
  ) return submitForm()
  emailErrorChanged(emailErr)
  passwordErrorChanged(passErr)
  repeatPasswordErrorChanged(repeatPasswordErr)
  firstNameErrorChanged(firstName)
  lastNameErrorChanged(lastName)
})
const submitFormFx = attach({
  effect: RegistrationFx,
  mapParams: (params: any) => params
})
// events
export const validateForm = createEvent()
export const submitForm = createEvent()
// сторы
export const [$email, emailChanged] = createEffectorField({ defaultValue: '' })
export const [$password, passwordChanged] = createEffectorField({ defaultValue: '' })
export const [$repeatPassword, repeatPasswordChanged] = createEffectorField({ defaultValue: '' })
export const [$firstName, firstNameChanged] = createEffectorField({ defaultValue: '' })
export const [$lastName, lastNameChanged] = createEffectorField({ defaultValue: '' })

export const [$emailError, emailErrorChanged] = createEffectorField({ defaultValue: '' })
export const [$passwordError, passwordErrorChanged] = createEffectorField({ defaultValue: '' })
export const [$repeatPasswordError, repeatPasswordErrorChanged] = createEffectorField({ defaultValue: '' })
export const [$firstNameError, firstNameErrorChanged] = createEffectorField({ defaultValue: '' })
export const [$lastNameError, lastNameErrorChanged] = createEffectorField({ defaultValue: '' })

export const $form = combine({
  email: $email,
  password: $password,
  repeatPassword: $repeatPassword,
  firstName: $firstName,
  lastName: $lastName
})
export const $errors = combine({
  emailError: $emailError,
  passwordError: $passwordError,
  repeatPasswordError: $repeatPasswordError,
  firstNameError: $firstNameError,
  lastNameError: $lastNameError
})

const $isFormValid = combine(
  $email,
  $password,
  $repeatPassword,
  $firstName,
  $lastName,
  $emailError,
  $passwordError,
  $repeatPasswordError,
  $firstNameError,
  $lastNameError,
  (
    email,
    password,
    repeatPassword,
    firstName,
    lastName,
    emailError,
    passwordError,
    repeatPasswordError,
    firstNameError,
    lastNameError,
  ) =>
    email.length > 0
    || password.length > 0
    || repeatPassword.length > 0
    || firstName.length > 0
    || lastName.length > 0
    || emailError.length === 0
    || passwordError.length === 0
    || repeatPasswordError.length === 0
    || firstNameError.length === 0
    || lastNameError.length === 0
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
  clock: validateForm,
  target: submitFormFx
})
// forward юзаем после запроса
// forward({
//   from: submitFormFx.doneData,
//   to: addToast.prepend(() => ({ type: 'error', message: 'Пользователь не найден' })),
// })
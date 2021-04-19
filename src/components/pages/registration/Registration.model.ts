import { createEvent, createEffect, attach, combine, sample, guard, forward } from 'effector-root'
import { RegistrationFx } from '@/api/Registration'
import { createEffectorField } from '@/helpers/effector-field'
import { navigatePush } from '@/helpers/navigation'
import { validatorForm } from '@/helpers/validator'
import { getRouterByName } from '@/routes'
import { setTokenForRequest, setRefreshTokenForRequest } from '@/api/common/AuthorizedRequest'

type IncommingData = {
  email: string
  password: string
  repeat_password: string
  first_name: string
  last_name: string
  gender: string
  birth_date: Date | null
  phone: string
}
// эффекты
const validateFormFx = createEffect((params: IncommingData) => {
  const emailErr = validatorForm({ value: params.email, isEmail: true })
  const passErr = validatorForm({ value: params.password, minSize: 6 })
  let repeatPasswordErr = validatorForm({ value: params.repeat_password })
  if (!repeatPasswordErr.length) repeatPasswordErr = params.password === params.repeat_password ? '' : 'Пароли не совпадают'
  const firstNameErr = validatorForm({ value: params.first_name, minSize: 2 })
  const lastNameErr = validatorForm({ value: params.last_name, minSize: 2 })
  const genderErr = validatorForm({ value: params.gender })
  const birthDateErr = validatorForm({ value: params.birth_date })
  const phoneErr = validatorForm({ value: params.phone, isPhone: true })
  if (
    !emailErr.length
    && !passErr.length
    && !repeatPasswordErr.length
    && !firstNameErr.length
    && !lastNameErr.length
    && !genderErr.length
    && !birthDateErr.length
    && !phoneErr.length
  ) return submitForm()
  emailErrorChanged(emailErr)
  passwordErrorChanged(passErr)
  repeatPasswordErrorChanged(repeatPasswordErr)
  firstNameErrorChanged(firstNameErr)
  lastNameErrorChanged(lastNameErr)
  genderErrorChanged(genderErr)
  birthDateErrorChanged(birthDateErr)
  phoneErrorChanged(phoneErr)
})
const submitFormFx = attach({
  effect: RegistrationFx,
  mapParams: (params: IncommingData) => {
    feedBackChanged('')
    return { ...params, birth_date: params.birth_date || new Date() }
  }
})
const setErrorFx = createEffect((data: any) => {
  feedBackChanged(data.body.code === 'user_is_exist' ? 'Введенный Email уже существует' : 'Сервис временно не работает...')
})
// events
export const validateForm = createEvent()
export const submitForm = createEvent()
export const resetFields = createEvent()
// сторы
export const [$email, emailChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$password, passwordChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$repeatPassword, repeatPasswordChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$firstName, firstNameChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$lastName, lastNameChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$gender, genderChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$birthDate, birthDateChanged] = createEffectorField<Date | null>({ defaultValue: null, reset: resetFields })
export const [$phone, phoneChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$feedBack, feedBackChanged] = createEffectorField({ defaultValue: '', reset: resetFields })

export const [$emailError, emailErrorChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$passwordError, passwordErrorChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$repeatPasswordError, repeatPasswordErrorChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$firstNameError, firstNameErrorChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$lastNameError, lastNameErrorChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$genderError, genderErrorChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$birthDateError, birthDateErrorChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$phoneError, phoneErrorChanged] = createEffectorField({ defaultValue: '', reset: resetFields })

export const $form = combine({
  email: $email,
  password: $password,
  repeat_password: $repeatPassword,
  first_name: $firstName,
  last_name: $lastName,
  gender: $gender,
  birth_date: $birthDate,
  phone: $phone
})
export const formChanged = {
  email: emailChanged,
  password: passwordChanged,
  repeatPassword: repeatPasswordChanged,
  firstName: firstNameChanged,
  lastName: lastNameChanged,
  gender: genderChanged,
  birthDate: birthDateChanged,
  phone: phoneChanged,
  emailError: emailErrorChanged,
  passwordError: passwordErrorChanged,
  repeatPasswordError: repeatPasswordErrorChanged,
  firstNameError: firstNameErrorChanged,
  lastNameError: lastNameErrorChanged,
  genderError: genderErrorChanged,
  birthDateError: birthDateErrorChanged,
  phoneError: phoneErrorChanged
}
export const $errors = combine({
  emailError: $emailError,
  passwordError: $passwordError,
  repeatPasswordError: $repeatPasswordError,
  firstNameError: $firstNameError,
  lastNameError: $lastNameError,
  genderError: $genderError,
  birthDateError: $birthDateError,
  phoneError: $phoneError
})
const $isFormValid = combine(
  $form, form =>
    form.email.length > 0
    && form.password.length > 0
    && form.repeat_password.length > 0
    && form.first_name.length > 0
    && form.last_name.length > 0
    && form.gender.length > 0
    && form.birth_date instanceof Date
    && form.phone.length > 0
)
const $validErrors = combine(
  $errors, errors  =>
  errors.emailError.length === 0
    && errors.passwordError.length === 0
    && errors.repeatPasswordError.length === 0
    && errors.firstNameError.length === 0
    && errors.lastNameError.length === 0
    && errors.genderError.length === 0
    && errors.birthDateError.length === 0
    && errors.phoneError.length === 0
)
export const $canSubmit = combine(
  $isFormValid,
  $validErrors,
  submitFormFx.pending,
  (isFormValid, validErrors, sendFormPending) => isFormValid && validErrors && !sendFormPending
)
// методы
sample({
  clock: validateForm,
  source: $form,
  target: validateFormFx
})
sample({
  clock: submitForm,
  source: guard({ source: $form, filter: $canSubmit }),
  target: submitFormFx
})
forward({
  from: submitFormFx.failData,
  to: setErrorFx
})
forward({
  from: submitFormFx.doneData,
  to: [
    setTokenForRequest.prepend(({ body }: any) => body.access_token),
    setRefreshTokenForRequest.prepend(({ body }: any) => body.refresh_token),
    navigatePush.prepend(() => ({ pathname: getRouterByName('profile-page').path })),
    resetFields
  ]
})
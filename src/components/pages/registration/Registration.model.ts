import { createEvent, createEffect, attach, combine, sample, guard, forward } from 'effector-root'
import { RegistrationFx } from '@/api/Registration'
import { RegistrationFxParams } from '@/api/types'
import { createEffectorField } from '@/helpers/effector-field'
import { navigatePush } from '@/helpers/navigation'
import { validatorForm } from '@/helpers/validator'
import { getRouterByName } from '@/routes'
import { setTokenForRequest, setRefreshTokenForRequest } from '@/api/common/AuthorizedRequest'

// эффекты
const validateFormFx = createEffect((params: RegistrationFxParams) => {
  const emailErr = validatorForm(params.email, true)
  const passErr = validatorForm(params.password, false, 6)
  let repeatPasswordErr = validatorForm(params.repeatPassword, false)
  if (!repeatPasswordErr.length) repeatPasswordErr = params.password === params.repeatPassword ? '' : 'Пароли не совпадают'
  const firstNameErr = validatorForm(params.firstName, false, 2)
  const lastNameErr = validatorForm(params.lastName, false, 2)
  const genderErr = validatorForm(params.gender, false)
  const birthDateErr = validatorForm(params.birthDate, false)
  if (
    !emailErr.length
    && !passErr.length
    && !repeatPasswordErr.length
    && !firstNameErr.length
    && !lastNameErr.length
    && !genderErr.length
    && !birthDateErr.length
  ) return submitForm()
  emailErrorChanged(emailErr)
  passwordErrorChanged(passErr)
  repeatPasswordErrorChanged(repeatPasswordErr)
  firstNameErrorChanged(firstNameErr)
  lastNameErrorChanged(lastNameErr)
  genderErrorChanged(genderErr)
  birthDateErrorChanged(birthDateErr)
})
const submitFormFx = attach({
  effect: RegistrationFx,
  mapParams: (params: RegistrationFxParams) => {
    feedBackChanged('')
    return params
  }
})
const setErrorFx = createEffect((data: any) => {
  feedBackChanged(data.body.code === 'user_is_exist' ? 'Введенный Email уже существует' : 'Сервис временно не работает...')
})
// events
export const validateForm = createEvent()
export const submitForm = createEvent()
const resetFields = createEvent()
// сторы
export const [$email, emailChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$password, passwordChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$repeatPassword, repeatPasswordChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$firstName, firstNameChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$lastName, lastNameChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$gender, genderChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$birthDate, birthDateChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$feedBack, feedBackChanged] = createEffectorField({ defaultValue: '', reset: resetFields })

export const [$emailError, emailErrorChanged] = createEffectorField({ defaultValue: '' })
export const [$passwordError, passwordErrorChanged] = createEffectorField({ defaultValue: '' })
export const [$repeatPasswordError, repeatPasswordErrorChanged] = createEffectorField({ defaultValue: '' })
export const [$firstNameError, firstNameErrorChanged] = createEffectorField({ defaultValue: '' })
export const [$lastNameError, lastNameErrorChanged] = createEffectorField({ defaultValue: '' })
export const [$genderError, genderErrorChanged] = createEffectorField({ defaultValue: '' })
export const [$birthDateError, birthDateErrorChanged] = createEffectorField({ defaultValue: '' })

export const $form = combine({
  email: $email,
  password: $password,
  repeatPassword: $repeatPassword,
  firstName: $firstName,
  lastName: $lastName,
  gender: $gender,
  birthDate: $birthDate
})
export const formChanged = {
  email: emailChanged,
  password: passwordChanged,
  repeatPassword: repeatPasswordChanged,
  firstName: firstNameChanged,
  lastName: lastNameChanged,
  gender: genderChanged,
  birthDate: birthDateChanged,
  emailError: emailErrorChanged,
  passwordError: passwordErrorChanged,
  repeatPasswordError: repeatPasswordErrorChanged,
  firstNameError: firstNameErrorChanged,
  lastNameError: lastNameErrorChanged,
  genderError: genderErrorChanged,
  birthDateError: birthDateErrorChanged
}
export const $errors = combine({
  emailError: $emailError,
  passwordError: $passwordError,
  repeatPasswordError: $repeatPasswordError,
  firstNameError: $firstNameError,
  lastNameError: $lastNameError,
  genderError: $genderError,
  birthDateError: $birthDateError
})
const $isFormValid = combine(
  $form, form =>
    form.email.length > 0
    && form.password.length > 0
    && form.repeatPassword.length > 0
    && form.firstName.length > 0
    && form.lastName.length > 0
    && form.gender.length > 0
    && form.birthDate.length > 0
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
    setTokenForRequest.prepend(({ body }: any) => body.accessToken),
    setRefreshTokenForRequest.prepend(({ body }: any) => body.refreshToken),
    navigatePush.prepend(() => ({ pathname: getRouterByName('profile-page').path })),
    resetFields
  ]
})
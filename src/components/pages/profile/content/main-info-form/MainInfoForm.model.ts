import { combine, restore, createEvent, attach, forward, createEffect, sample, guard } from 'effector-root'
import { createEffectorField } from '@/helpers/effector-field'
import { UpdatePersonalInfoFx } from '@/api/Profile'
import { validatorForm } from '@/helpers/validator'
import { $combinePersonalData } from '@/App.module'
import { UpdatePersonalInfoParams } from '@/api/types'

type UserInfo = {
  first_name: string,
  last_name: string,
  email: string,
  birth_date: Date,
  phone: string
}
// эффекты
export const submitUpdatePersonalInfoFx = attach({
  effect: UpdatePersonalInfoFx,
  mapParams: (params: UpdatePersonalInfoParams) => params
})
const validateFormFx = createEffect((params: {
  first_name?: string,
  last_name?: string,
  email?: string,
  birth_date?: Date,
  phone?: string
}) => {
  let firstNameErr = ''
  let lastNameErr = ''
  let emailErr = ''
  let birthDateErr = ''
  let phoneErr = ''
  if (params.first_name) firstNameErr = validatorForm({ value: params.first_name, minSize: 2 })
  if (params.last_name) lastNameErr = validatorForm({ value: params.last_name, minSize: 2 })
  if (params.email) emailErr = validatorForm({ value: params.email, isEmail: true })
  if (params.birth_date) birthDateErr = validatorForm({ value: params.birth_date })
  if (params.phone) phoneErr = validatorForm({ value: params.phone, isPhone: true })
  if (
    !firstNameErr.length &&
    !lastNameErr.length &&
    !emailErr.length &&
    !birthDateErr.length &&
    !phoneErr.length
  ) return submitForm()
  firstNameErrorChanged(firstNameErr)
  lastNameErrorChanged(lastNameErr)
  emailErrorChanged(emailErr)
  phoneErrorChanged(birthDateErr)
  birthDateErrorChanged(phoneErr)
})

// события
export const validateForm = createEvent()
const submitForm = createEvent()

// сторы
export const oldValueFormChanged = createEvent<UserInfo>()
export const $oldValueForm = restore(oldValueFormChanged, {
  first_name: '',
  last_name: '',
  email: '',
  birth_date: new Date(),
  phone: ''
})
export const [$firstName, firstNameChanged] = createEffectorField({ defaultValue: '' })
export const [$lastName, lastNameChanged] = createEffectorField({ defaultValue: '' })
export const [$email, emailChanged] = createEffectorField({ defaultValue: '' })
export const [$fullName, fullNameChanged] = createEffectorField({ defaultValue: '' })
export const [$phone, phoneChanged] = createEffectorField({ defaultValue: '' })
export const [$birth_date, birthDateChanged] = createEffectorField<Date | null>({ defaultValue: null })

export const [$firstNameError, firstNameErrorChanged] = createEffectorField({ defaultValue: '' })
export const [$lastNameError, lastNameErrorChanged] = createEffectorField({ defaultValue: '' })
export const [$emailError, emailErrorChanged] = createEffectorField({ defaultValue: '' })
export const [$phoneError, phoneErrorChanged] = createEffectorField({ defaultValue: '' })
export const [$birthDateError, birthDateErrorChanged] = createEffectorField({ defaultValue: '' })
const [$errorForm, errorFormChanged] = createEffectorField({ defaultValue: '' })

export const $mainInfoForm = combine({
  first_name: $firstName,
  last_name: $lastName,
  email: $email,
  full_name: $fullName,
  phone: $phone,
  birth_date: $birth_date
})

export const $isChanged = combine($mainInfoForm, $oldValueForm, (mainInfoForm, oldValueForm) => {
  let isChanged = false
  Object.keys(mainInfoForm).filter(item => item !== 'full_name').forEach(item => {
    // @ts-ignore
    if (mainInfoForm[item] !== oldValueForm[item]) isChanged = true
  })
  return isChanged
})
export const $changedFields = combine($mainInfoForm, $oldValueForm, (mainInfoForm, oldValueForm) => {
  const form = {}
  Object.keys(mainInfoForm).filter(item => item !== 'full_name').forEach(item => {
    // @ts-ignore
    if (mainInfoForm[item] !== oldValueForm[item]) form[item] = mainInfoForm[item]
  })
  return form
})
export const $disabledBtn = combine(
  $firstNameError,
  $lastNameError,
  $emailError,
  $phoneError,
  $birthDateError,
  (
    firstNameError,
    lastNameError,
    emailError,
    phoneError,
    birthDateError
  ) => 
    firstNameError.length !== 0 &&
    lastNameError.length !== 0 &&
    emailError.length !== 0 &&
    phoneError.length !== 0 &&
    birthDateError.length !== 0
)
export const mainInfoFormChanged = {
  firstName: firstNameChanged,
  lastName: lastNameChanged,
  email: emailChanged,
  fullName: fullNameChanged,
  phone: phoneChanged,
  birthDate: birthDateChanged
}
export const $mainInfoFormErrors = combine({
  firstNameError: $firstNameError,
  lastNameError: $lastNameError,
  emailError: $emailError,
  phoneError: $phoneError,
  birthDateError: $birthDateError,
  errorForm: $errorForm
})
export const mainInfoFormErrorsChanged = {
  firstNameError: firstNameErrorChanged,
  lastNameError: lastNameErrorChanged,
  emailError: emailErrorChanged,
  phoneError: phoneErrorChanged,
  birthDateError: birthDateErrorChanged
}
export const $paramsTosend = combine(
  $changedFields,
  $combinePersonalData,
  (params: {
    first_name?: string,
    last_name?: string,
    email?: string,
    birth_date?: Date,
    phone?: string
  }, personData) => {
  const data: UpdatePersonalInfoParams = {
    user_id: personData.id,
    token: personData.token,
  }
  if (params.first_name) data.first_name = params.first_name
  if (params.last_name) data.last_name = params.last_name
  if (params.email) data.email = params.email
  if (params.birth_date) data.birth_date = params.birth_date
  if (params.phone) data.phone = params.phone
  return data
})
export const $canSubmit = combine(
  $mainInfoForm,
  $mainInfoFormErrors,
  submitUpdatePersonalInfoFx.pending,
  (mainInfoForm, errorsForm, pending) => {
    return mainInfoForm.first_name.length !== 0
    && mainInfoForm.last_name.length !== 0
    && mainInfoForm.email.length !== 0
    && mainInfoForm.phone.length !== 0
    && typeof mainInfoForm.birth_date !== null
    && errorsForm.firstNameError.length === 0
    && errorsForm.lastNameError.length === 0
    && errorsForm.emailError.length === 0
    && errorsForm.phoneError.length === 0
    && errorsForm.birthDateError.length === 0
    && !pending
})

// методы
sample({
  clock: validateForm,
  source: $changedFields,
  target: validateFormFx
})
sample({
  clock: submitForm,
  source: guard({ source: $paramsTosend, filter: $canSubmit }),
  target: submitUpdatePersonalInfoFx
})
forward({
  from: submitUpdatePersonalInfoFx.failData,
  to: errorFormChanged.prepend(() => 'Сервис временно не работает'),
})
forward({
  from: submitUpdatePersonalInfoFx.doneData,
  to: [
    oldValueFormChanged.prepend(({ body }) => ({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      phone: body.phone,
      birth_date: body.birth_date
    })),
    firstNameChanged.prepend(({ body }) => body.first_name),
    lastNameChanged.prepend(({ body }) => body.last_name),
    emailChanged.prepend(({ body }) => body.email),
    fullNameChanged.prepend(({ body }) => `${body.first_name} ${body.last_name}`),
    birthDateChanged.prepend(({ body }) => body.birth_date),
    phoneChanged.prepend(({ body }) => body.phone)
  ]
})
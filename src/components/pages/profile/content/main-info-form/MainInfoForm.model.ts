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
  phone?: string
}) => {
  let firstNameErr = ''
  let lastNameErr = ''
  let emailErr = ''
  let phoneErr = ''
  if (params.first_name) firstNameErr = validatorForm({ value: params.first_name, minSize: 2 })
  if (params.last_name) lastNameErr = validatorForm({ value: params.last_name, minSize: 2 })
  if (params.email) emailErr = validatorForm({ value: params.email, isEmail: true })
  if (params.phone) phoneErr = validatorForm({ value: params.phone, isPhone: true })
  if (
    !firstNameErr.length &&
    !lastNameErr.length &&
    !emailErr.length &&
    !phoneErr.length
  ) return submitForm()
  firstNameErrorChanged(firstNameErr)
  lastNameErrorChanged(lastNameErr)
  emailErrorChanged(emailErr)
  phoneErrorChanged(phoneErr)
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
  phone: ''
})
export const resetFields = createEvent()
export const [$firstName, firstNameChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$lastName, lastNameChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$email, emailChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$fullName, fullNameChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$phone, phoneChanged] = createEffectorField({ defaultValue: '', reset: resetFields })

export const [$firstNameError, firstNameErrorChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$lastNameError, lastNameErrorChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$emailError, emailErrorChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
export const [$phoneError, phoneErrorChanged] = createEffectorField({ defaultValue: '', reset: resetFields })
const [$errorForm, errorFormChanged] = createEffectorField({ defaultValue: '', reset: resetFields })

export const $mainInfoForm = combine({
  first_name: $firstName,
  last_name: $lastName,
  email: $email,
  full_name: $fullName,
  phone: $phone
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
  (
    firstNameError,
    lastNameError,
    emailError,
    phoneError
  ) => 
    firstNameError.length !== 0 &&
    lastNameError.length !== 0 &&
    emailError.length !== 0 &&
    phoneError.length !== 0
)
export const mainInfoFormChanged = {
  firstName: firstNameChanged,
  lastName: lastNameChanged,
  email: emailChanged,
  fullName: fullNameChanged,
  phone: phoneChanged,
}
export const $mainInfoFormErrors = combine({
  firstNameError: $firstNameError,
  lastNameError: $lastNameError,
  emailError: $emailError,
  phoneError: $phoneError,
  errorForm: $errorForm
})
export const mainInfoFormErrorsChanged = {
  firstNameError: firstNameErrorChanged,
  lastNameError: lastNameErrorChanged,
  emailError: emailErrorChanged,
  phoneError: phoneErrorChanged
}
export const $paramsTosend = combine(
  $changedFields,
  $combinePersonalData,
  (params: {
    first_name?: string,
    last_name?: string,
    email?: string,
    phone?: string
  }, personData) => {
  const data: UpdatePersonalInfoParams = {
    user_id: personData.id,
    token: personData.token,
  }
  if (params.first_name) data.first_name = params.first_name
  if (params.last_name) data.last_name = params.last_name
  if (params.email) data.email = params.email
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
    && errorsForm.firstNameError.length === 0
    && errorsForm.lastNameError.length === 0
    && errorsForm.emailError.length === 0
    && errorsForm.phoneError.length === 0
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
    })),
    firstNameChanged.prepend(({ body }) => body.first_name),
    lastNameChanged.prepend(({ body }) => body.last_name),
    emailChanged.prepend(({ body }) => body.email),
    fullNameChanged.prepend(({ body }) => `${body.first_name} ${body.last_name}`),
    phoneChanged.prepend(({ body }) => body.phone)
  ]
})
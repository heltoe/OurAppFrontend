import { combine, restore, createEvent, attach, forward } from 'effector-root'
import { createEffectorField } from '@/helpers/effector-field'
import { UpdatePersonalInfoFx } from '@/api/Profile'

// эффекты
export const submitUpdatePersonalInfoFx = attach({
  effect: UpdatePersonalInfoFx,
  mapParams: (params: any) => params
})

// события
export const validateForm = createEvent()
const submitForm = createEvent()

// сторы
export const oldValueFormChanged = createEvent<any>()
export const $oldValueForm = restore(oldValueFormChanged, {})
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

// методы
forward({
  from: submitUpdatePersonalInfoFx.failData,
  to: errorFormChanged.prepend(() => 'Сервис временно не работает'),
})
forward({
  from: submitUpdatePersonalInfoFx.doneData,
  to: [
    firstNameChanged.prepend(() => ''),
    lastNameChanged.prepend(() => ''),
    emailChanged.prepend(() => ''),
    fullNameChanged.prepend(() => ''),
    phoneChanged.prepend(() => ''),
    // birthDateChanged.prepend(() => ''),
  ]
})
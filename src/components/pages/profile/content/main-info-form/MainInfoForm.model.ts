import { combine, restore, createEvent } from 'effector-root'
import { createEffectorField } from '@/helpers/effector-field'

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
    console.log(mainInfoForm[item], oldValueForm[item])
    // @ts-ignore
    if (mainInfoForm[item] !== oldValueForm[item]) isChanged = true
  })
  return isChanged
})
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
  birthDateError: $birthDateError
})
export const mainInfoFormErrorsChanged = {
  firstNameError: firstNameErrorChanged,
  lastNameError: lastNameErrorChanged,
  emailError: emailErrorChanged,
  phoneError: phoneErrorChanged,
  birthDateError: birthDateErrorChanged
}

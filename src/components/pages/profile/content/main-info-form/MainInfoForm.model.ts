import { combine } from 'effector-root'
import { createEffectorField } from '@/helpers/effector-field'

// сторы
export const [$firstName, firstNameChanged] = createEffectorField({ defaultValue: '' })
export const [$lastName, lastNameChanged] = createEffectorField({ defaultValue: '' })
export const [$email, emailChanged] = createEffectorField({ defaultValue: '' })
export const [$fullName, fullNameChanged] = createEffectorField({ defaultValue: '' })

export const [$firstNameError, firstNameErrorChanged] = createEffectorField({ defaultValue: '' })
export const [$lastNameError, lastNameErrorChanged] = createEffectorField({ defaultValue: '' })
export const [$emailError, emailErrorChanged] = createEffectorField({ defaultValue: '' })

export const $mainInfoForm = combine({
  firstName: $firstName,
  lastName: $lastName,
  email: $email,
  fullName: $fullName
})
export const mainInfoFormChanged = {
  firstName: firstNameChanged,
  lastName: lastNameChanged,
  email: emailChanged,
  fullName: fullNameChanged
}
export const $mainInfoFormErrors = combine({
  firstNameError: $firstNameError,
  lastNameError: $lastNameError,
  emailError: $emailError
})
export const mainInfoFormErrorsChanged = {
  firstNameError: firstNameErrorChanged,
  lastNameError: lastNameErrorChanged,
  emailError: emailErrorChanged
}
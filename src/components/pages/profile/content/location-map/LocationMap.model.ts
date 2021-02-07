import { combine } from 'effector-root'
import { createEffectorField } from '@/helpers/effector-field'

// сторы
export const [$location, locationChanged] = createEffectorField({ defaultValue: '' })
export const [$locationError, locationErrorChanged] = createEffectorField({ defaultValue: '' })

export const $locationForm = combine({
  location: $location,
  locationError: $locationError,
})
export const locationFormChanged = {
  location: locationChanged,
  locationError: locationErrorChanged,
}

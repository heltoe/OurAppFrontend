import { combine } from 'effector-root'
import { createEffectorField } from '@/helpers/effector-field'

export const [$password, passwordChanged] = createEffectorField({ defaultValue: '' })
export const [$repassword, repasswordChanged] = createEffectorField({ defaultValue: '' })

export const $isChanged = combine($password, $repassword, (password, repassword) => password.length > 0 || repassword.length > 0)

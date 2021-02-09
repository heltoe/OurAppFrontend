import { attach, createEvent, sample, combine, guard, forward } from 'effector-root'
import { createEffectorField } from '@/helpers/effector-field'
import { RemoveAccountFx } from '@/api/Profile'
import { RemoveAccountFxParams } from '@/api/types'
import { $combinePersonalData } from '@/App.module'
import { $token } from '@/api/common/AuthorizedRequest'
import { logout } from '@/api/common/AuthorizedRequest'

// эффекты
export const submitRequestRemoveAccountFx = attach({
  effect: RemoveAccountFx,
  mapParams: (params: RemoveAccountFxParams) => params
})

// события
export const removeAccount = createEvent()

// сторы
export const [$photo, photoChanged] = createEffectorField({ defaultValue: '' })
export const [$warningModal, warningModalChanged] = createEffectorField({ defaultValue: false })
export const $canSendPersonalRequest = combine(
  $token,
  submitRequestRemoveAccountFx.pending,
  (token, sendRequestPending) => token.length > 0 && !sendRequestPending
)

// методы
// sample({
//   clock: removeAccount,
//   source: guard({ source: $combinePersonalData, filter: $canSendPersonalRequest }),
//   target: submitRequestRemoveAccountFx
// })
forward({
  from: submitRequestRemoveAccountFx.doneData,
  to: logout
})

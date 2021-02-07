import { attach, createEvent, createEffect, restore, sample, guard, combine, forward } from 'effector-root'
import { ProfileFx, PersonalInfoFx } from '@/api/Profile'
import { Response } from '@/api/common/Request'
import { PersonalInfoFxParams, ProfileFxParams, ProfileFxResponse } from '@/api/types'
import { $token } from '@/api/common/AuthorizedRequest'
import { mainInfoFormChanged } from '@/components/pages/profile/content/main-info-form/MainInfoForm.model'
import { locationFormChanged } from '@/components/pages/profile/content/location-map/LocationMap.model'
import { photoChanged } from '@/components/pages/profile/content/photo-block/PhotoBlock.model'
import { $idUser, $preparePersonDataId, $preparePersonalDataToken } from '@/App.module'
import { setIdUser } from '@/App.module'

// эффекты
// инфо владельца аккаунта
export const submitRequestPersonalInfoFx = attach({
  effect: PersonalInfoFx,
  mapParams: (params: PersonalInfoFxParams) => params
})
// инфо выбранного пользователя
export const submitRequestUserInfoFx = attach({
  effect: ProfileFx,
  mapParams: (params: ProfileFxParams) => params
})
const setPersonalDataFx = createEffect(({ body }: Response<ProfileFxResponse>) => {
  setIdUser(`${body.id}`)
  mainInfoFormChanged.id(body.id)
  mainInfoFormChanged.firstName(body.firstName || '')
  mainInfoFormChanged.lastName(body.lastName || '')
  mainInfoFormChanged.fullName(body.firstName && body.lastName ? `${body.firstName} ${body.lastName}` : '')
  mainInfoFormChanged.email(body.email || '')
  locationFormChanged.location(body.location || '')
  photoChanged(body.photo)
})

// события
export const loadPersonalInfo = createEvent()
export const loadUser = createEvent()
const changeProfile = createEvent<ProfileFxResponse>()

// сторы
export const $profileUser = restore(changeProfile, {
  id: 0,
  email: '',
  firstName: '',
  lastName: '',
  role: '',
  location: '',
  photo: '',
  gender: '',
  birthDate: ''
})
export const $canSendPersonalRequest = combine(
  $token,
  submitRequestPersonalInfoFx.pending,
  (token, sendRequestPending) => token.length > 0 && !sendRequestPending
)
export const $canSendUserRequest = combine(
  $idUser,
  submitRequestUserInfoFx.pending,
  (idUser, sendRequestPending) => idUser.length > 0 && !sendRequestPending
)

// методы
sample({
  clock: loadPersonalInfo,
  source: guard({ source: $preparePersonalDataToken, filter: $canSendPersonalRequest }),
  target: submitRequestPersonalInfoFx
})
sample({
  clock: loadUser,
  source: guard({ source: $preparePersonDataId, filter: $canSendUserRequest }),
  target: submitRequestUserInfoFx
})
//
// forward({
//   from: submitRequestPersonalInfoFx.failData,
//   to: setErrorFx
// })
forward({
  from: submitRequestPersonalInfoFx.doneData,
  to: setPersonalDataFx
})

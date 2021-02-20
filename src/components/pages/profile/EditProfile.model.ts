import { attach, createEvent, createEffect, restore, sample, guard, combine, forward } from 'effector-root'
import { ProfileFx, PersonalInfoFx } from '@/api/Profile'
import { Response } from '@/api/common/Request'
import { PersonalInfoFxParams, UserId, User, Profile } from '@/api/types'
import { $token } from '@/api/common/AuthorizedRequest'
import { mainInfoFormChanged } from '@/components/pages/profile/content/main-info-form/MainInfoForm.model'
import { photoChanged } from '@/components/pages/profile/content/photo-block/PhotoBlock.model'
import { $idUser, $prepareUserDataId, $preparePersonalDataToken } from '@/App.module'
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
  mapParams: (params: UserId) => params
})
const setPersonalDataFx = createEffect(({ body }: Response<Profile>) => {
  console.log(body)
  setIdUser(body.id)
  mainInfoFormChanged.firstName(body.first_name || '')
  mainInfoFormChanged.lastName(body.last_name || '')
  mainInfoFormChanged.fullName(body.first_name && body.last_name ? `${body.first_name} ${body.last_name}` : '')
  mainInfoFormChanged.email(body.email || '')
  photoChanged(body.photo || '')
})

// события
export const loadPersonalInfo = createEvent()
export const loadUser = createEvent()
const changeProfile = createEvent<User>()

// сторы
export const $profileUser = restore(changeProfile, {
  id: 0,
  // email: '',
  first_name: '',
  last_name: '',
  gender: '',
  birth_date: '',
  photo: '',
  phone: ''
})
export const $canSendPersonalRequest = combine(
  $token,
  submitRequestPersonalInfoFx.pending,
  (token, sendRequestPending) => token.length > 0 && !sendRequestPending
)
export const $canSendUserRequest = combine(
  $idUser,
  submitRequestUserInfoFx.pending,
  (idUser, sendRequestPending) => typeof idUser === 'number' && !sendRequestPending
)

// методы
sample({
  clock: loadPersonalInfo,
  source: guard({ source: $preparePersonalDataToken, filter: $canSendPersonalRequest }),
  target: submitRequestPersonalInfoFx
})
sample({
  clock: loadUser,
  source: guard({ source: $prepareUserDataId, filter: $canSendUserRequest }),
  target: submitRequestUserInfoFx
})

// forward({
//   from: submitRequestPersonalInfoFx.failData,
//   to: setErrorFx
// })
forward({
  from: submitRequestPersonalInfoFx.doneData,
  to: setPersonalDataFx
})

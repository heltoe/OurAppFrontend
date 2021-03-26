import { attach, createEvent, restore, sample, guard, combine, forward } from 'effector-root'
import { ProfileFx, PersonalInfoFx } from '@/api/Profile'
import { PersonalInfoFxParams, UserId, User } from '@/api/types'
import { $token } from '@/api/common/AuthorizedRequest'
import { mainInfoFormChanged, oldValueFormChanged } from '@/components/pages/profile/content/main-info-form/MainInfoForm.model'
import { originalPhotoChanged, cropedPhotoChanged } from '@/components/pages/profile/content/photo-block/PhotoBlock.model'
import { logout } from '@/api/common/AuthorizedRequest'
import { $userId, $prepareUserDataId, $preparePersonalDataToken } from '@/App.module'
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

// события
export const loadPersonalInfo = createEvent()
export const loadUser = createEvent()
const changeProfile = createEvent<User>()

// сторы
export const $profileUser = restore(changeProfile, {
  user_id: 0,
  first_name: '',
  last_name: '',
  gender: '',
  birth_date: new Date(),
  original_photo: '',
  croped_photo: '',
  phone: ''
})
export const $canSendPersonalRequest = combine(
  $token,
  submitRequestPersonalInfoFx.pending,
  (token, sendRequestPending) => token.length > 0 && !sendRequestPending
)
export const $canSendUserRequest = combine(
  $userId,
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

forward({
  from: submitRequestPersonalInfoFx.failData,
  to: logout
})
forward({
  from: submitRequestPersonalInfoFx.doneData,
  to: [
    changeProfile.prepend(({ body }) => ({
      user_id: body.user_id,
      first_name: body.first_name,
      last_name: body.last_name,
      gender: body.gender,
      birth_date: body.birth_date,
      original_photo: body.original_photo,
      croped_photo: body.croped_photo,
      phone: body.phone
    })),
    oldValueFormChanged.prepend(({ body }) => ({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      phone: body.phone,
      birth_date: body.birth_date
    })),
    setIdUser.prepend(({ body }) => body.user_id),
    mainInfoFormChanged.firstName.prepend(({ body }) => body.first_name || ''),
    mainInfoFormChanged.lastName.prepend(({ body }) => body.last_name || ''),
    mainInfoFormChanged.fullName.prepend(({ body }) => body.first_name && body.last_name ? `${body.first_name} ${body.last_name}` : ''),
    mainInfoFormChanged.email.prepend(({ body }) => body.email || ''),
    mainInfoFormChanged.phone.prepend(({ body }) => body.phone || ''),
    mainInfoFormChanged.birthDate.prepend(({ body }) => body.birth_date || ''),
    originalPhotoChanged.prepend(({ body }) => body.original_photo || ''),
    cropedPhotoChanged.prepend(({ body }) => body.croped_photo || '')
  ]
})

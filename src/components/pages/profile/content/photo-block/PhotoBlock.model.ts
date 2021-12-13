import { attach, combine, createEvent, guard, restore, sample, forward } from 'effector-root'
import { ChangeAvatarFx } from '@/api/Profile'
import { AvatarFxParams } from '@/api/types'
import { $combinePersonalData } from '@/App.module'

export const uploadAvatarFx = attach({
  effect: ChangeAvatarFx,
  mapParams: (params: AvatarFxParams) => {
    const formData = new FormData()
    // @ts-ignore
    formData.append('user_id', params.user_id)
    formData.append('token', params.token)
    // @ts-ignore
    formData.append('original_photo', params.original_photo)
    // @ts-ignore
    formData.append('croped_photo', params.croped_photo)
    // @ts-ignore
    formData.append('original_photo_name', params.original_photo_name)
    // @ts-ignore
    formData.append('croped_photo_name', params.croped_photo_name)
    return formData
  }
})

export const changeAvatar = createEvent()

export const changeIsShowModal = createEvent<boolean>()
export const $isShowModal = restore(changeIsShowModal, false)

export const originalPhotoChanged = createEvent<string>()
export const $originalPhoto = restore(originalPhotoChanged, '')

export const cropedPhotoChanged = createEvent<string>()
export const $cropedPhoto = restore(cropedPhotoChanged, '')

export const originalFileChanged = createEvent<File | null>()
export const $originalFile = restore(originalFileChanged, null)
export const cropedFileChanged = createEvent<File | null>()
const $cropedFile = restore(cropedFileChanged, null)

const $sendForm = combine(
  $originalFile,
  $cropedFile,
  $combinePersonalData,
  $originalPhoto,
  $cropedPhoto,
  (originalFile, cropedFile, combinePersonalData, originalPhoto, cropedPhoto) => ({
    user_id: combinePersonalData.id,
    token: combinePersonalData.token,
    original_photo: originalFile,
    croped_photo: cropedFile,
    original_photo_name: originalPhoto,
    croped_photo_name: cropedPhoto,
  })
)
export const $canSubmit = combine(
  uploadAvatarFx.pending,
  $originalFile,
  $cropedFile,
  (pending, originalFile, cropedFile) => !pending && originalFile !== null && cropedFile !== null
)

sample({
  clock: changeAvatar,
  source: guard({ source: $sendForm, filter: $canSubmit }),
  target: uploadAvatarFx
})

forward({
  from: uploadAvatarFx.doneData,
  to: [
    changeIsShowModal.prepend(() => false),
    originalPhotoChanged.prepend(({ body }) => body.original_photo),
    cropedPhotoChanged.prepend(({ body }) => body.croped_photo),
  ]
})

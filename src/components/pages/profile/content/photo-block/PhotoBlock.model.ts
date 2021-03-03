import { attach, combine, createEvent, guard, restore, sample, forward } from 'effector-root'
import { ChangeAvatarFx } from '@/api/Profile'
import { AvatarFxParams } from '@/api/types'
import { $combinePersonalData } from '@/App.module'

const uploadAvatarFx = attach({
  effect: ChangeAvatarFx,
  mapParams: (params: AvatarFxParams) => {
    const formData = new FormData()
    // @ts-ignore
    formData.append('user_id', params.user_id)
    formData.append('token', params.token)
    // @ts-ignore
    formData.append('photo', params.photo)
    return formData
  }
})

export const changeIsShowModal = createEvent<boolean>()
export const $isShowModal = restore(changeIsShowModal, false)

export const photoChanged = createEvent<string>()
export const $photo = restore(photoChanged, '')

export const fileChanged = createEvent<File | null>()
const $file = restore(fileChanged, null)
const $sendForm = combine(
  $file,
  $combinePersonalData,
  (file, combinePersonalData) => ({ user_id: combinePersonalData.id, token: combinePersonalData.token, photo: file })
)
const $canSubmit = combine(uploadAvatarFx.pending, $file, (pending, file) => !pending && file !== null)

sample({
  clock: fileChanged,
  source: guard({ source: $sendForm, filter: $canSubmit }),
  target: uploadAvatarFx
})

forward({
  from: uploadAvatarFx.doneData,
  to: photoChanged.prepend(({ body }) => body.result),
})

import { combine, createEvent } from 'effector-root'
import { createEffectorField } from '@/helpers/effector-field'
import { $token } from '@/api/common/AuthorizedRequest'

// события
export const resetPage = createEvent()

// сторы
export const [$idUser, setIdUser] = createEffectorField({ defaultValue: 0 })
export const $preparePersonDataId = combine({ id: $idUser })
export const $preparePersonalDataToken = combine({ token: $token })
export const $combinePersonalData = combine({ id: $idUser, token: $token })
export const $prepareUserDataId = combine({ userId: $idUser })

export const [$friendId, friendIdChanged] = createEffectorField({ defaultValue: 0 })

export const [$page, pageChanged] = createEffectorField({ defaultValue: 1 })
export const [$canLoadMore, canLoadMoreChanged] = createEffectorField({ defaultValue: true })

export const $prepareDataGetRequest = combine({
  userId: $idUser,
  page: $page
})
export const $friendData = combine({
  userId: $idUser,
  friendId: $friendId
})

export const [$typePage, typePageChanged] = createEffectorField({ defaultValue: 'friends' })

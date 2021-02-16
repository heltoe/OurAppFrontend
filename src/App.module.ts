import { combine, createEvent, restore } from 'effector-root'
import { $token } from '@/api/common/AuthorizedRequest'

export const setIdUser = createEvent<number>()
export const $idUser = restore(setIdUser, 0)
export const friendIdChanged = createEvent<number>()
export const $friendId = restore(friendIdChanged, 0)

export const $preparePersonDataId = combine({ id: $idUser })
export const $preparePersonalDataToken = combine({ token: $token })
export const $combinePersonalData = combine({ id: $idUser, token: $token })
export const $prepareUserDataId = combine({ userId: $idUser })
export const $friendData = combine({
  userId: $idUser,
  friendId: $friendId
})

export const typePages = {
  friends: 'friends',
  online: 'online',
  friendship: 'friendship',
  findFriend: 'findFriend'
}
export const typePageChanged = createEvent<string>()
export const $typePage = restore(typePageChanged, typePages.friends)

export const pageChanged = createEvent<number>()
export const $page = restore(pageChanged, 0)
$page.on(typePageChanged, () => 1)

export const canLoadMoreChanged = createEvent<boolean>()
export const $canLoadMore = restore(canLoadMoreChanged, true)

export const $prepareDataToInfinityScroll = combine({
  page: $page,
  typePage: $typePage
})
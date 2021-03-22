import { attach, createEvent, combine, sample, guard, createStore } from 'effector-root'
import { UserId, User, CommonFxParams } from '@/api/types'
import { RemoveFromFriendsFx, ListFriendsFx } from '@/api/Friends'
import {
  $friendData,
  $prepareUserDataId,
  $canLoadMore,
  $page,
  loadAllFriends,
  loadOnlineFriends,
  resetAllFriends,
  resetOnlineFriends
} from '@/App.module'
import { $token } from '@/api/common/AuthorizedRequest'

// эффекты
// получить список друзей
export const submitRequestFriendsListFx = attach({
  source: $page,
  effect: ListFriendsFx,
  mapParams: (params: UserId, page: number) => {
    const query = `offset=${page}&limit=9`
    return { ...params, query }
  }
})
// удалить с друзей
export const submitRequestRemoveFromFriendsFx = attach({
  effect: RemoveFromFriendsFx,
  mapParams: (params: CommonFxParams) => params
})

// события
export const removeFromFriends = createEvent()

// сторы
export const $allFriends = createStore<User[]>([])
$allFriends.on(submitRequestFriendsListFx.doneData, (state, payload) => [...state, ...payload.body.results.map(item => ({ ...item, photo: item.croped_photo || '' }))])
$allFriends.on(submitRequestRemoveFromFriendsFx.doneData, (state, payload) => state.filter(item => item.id !== payload.body.user_id))
$allFriends.on(resetAllFriends, () => [])

export const $onlineFriends = createStore<User[]>([])
$onlineFriends.on(submitRequestFriendsListFx.doneData, (state, payload) => [...state, ...payload.body.results.map(item => ({ ...item, photo: item.croped_photo || '' }))])
$onlineFriends.on(submitRequestRemoveFromFriendsFx.doneData, (state, payload) => state.filter(item => item.id !== payload.body.user_id))
$onlineFriends.on(resetOnlineFriends, () => [])

$canLoadMore.on(submitRequestFriendsListFx.doneData, (state, payload) => payload.body.next)

export const $countAllFriends = createStore(0)
$countAllFriends.on(submitRequestFriendsListFx.doneData, (state, payload) => payload.body.count)

export const $countOnlineFriends = createStore(0)
$countOnlineFriends.on(submitRequestFriendsListFx.doneData, (state, payload) => payload.body.count)

const $canSendFriendRequest = combine(
  $token,
  $canLoadMore,
  submitRequestFriendsListFx.pending,
  (token, canLoadMore, sendRequestPending) => token.length > 0 && canLoadMore && !sendRequestPending
)
const $canSendRemoveFromFriendRequest = combine(
  $token,
  submitRequestRemoveFromFriendsFx.pending,
  (token, sendRequestPending) => token.length > 0 && !sendRequestPending
)

// методы
// загрузка и запись друзей
sample({
  clock: loadAllFriends,
  source: guard({ source: $prepareUserDataId, filter: $canSendFriendRequest }),
  target: submitRequestFriendsListFx
})
sample({
  clock: loadOnlineFriends,
  source: guard({ source: $prepareUserDataId, filter: $canSendFriendRequest }),
  target: submitRequestFriendsListFx
})
// удалить из друзей
sample({
  clock: removeFromFriends,
  source: guard({ source: $friendData, filter: $canSendRemoveFromFriendRequest }),
  target: submitRequestRemoveFromFriendsFx
})

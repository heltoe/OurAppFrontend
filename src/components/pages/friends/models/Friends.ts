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
export const submitRequestFriendsListCountFx = attach({
  source: $page,
  effect: ListFriendsFx,
  mapParams: (params: UserId, page: number) => {
    const query = `offset=${page}&limit=9`
    return { ...params, query }
  }
})
//
export const submitRequestOnlineFriendsListFx = attach({
  source: $page,
  effect: ListFriendsFx,
  mapParams: (params: UserId, page: number) => {
    const query = `offset=${page}&limit=9&online=true`
    return { ...params, query }
  }
})
export const submitRequestOnlineFriendsCountListFx = attach({
  source: $page,
  effect: ListFriendsFx,
  mapParams: (params: UserId, page: number) => {
    const query = `offset=${page}&limit=9&online=true`
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
export const fetchCountFriends = createEvent()
export const fetchCountOnlineFriends = createEvent()

// сторы
export const $allFriends = createStore<User[]>([]).reset(resetAllFriends)
$allFriends.on(submitRequestFriendsListFx.doneData, (state, payload) => [...state, ...payload.body.results.map(item => ({ ...item, photo: item.croped_photo || '' }))])
$allFriends.on(submitRequestRemoveFromFriendsFx.doneData, (state, payload) => state.filter(item => item.user_id !== payload.body.user_id))

export const $onlineFriends = createStore<User[]>([]).reset(resetOnlineFriends)
$onlineFriends.on(submitRequestOnlineFriendsListFx.doneData, (state, payload) => [...state, ...payload.body.results.map(item => ({ ...item, photo: item.croped_photo || '' }))])
$onlineFriends.on(submitRequestRemoveFromFriendsFx.doneData, (state, payload) => state.filter(item => item.user_id !== payload.body.user_id))

$canLoadMore.on(submitRequestFriendsListFx.doneData, (state, payload) => payload.body.next)
$canLoadMore.on(submitRequestOnlineFriendsListFx.doneData, (state, payload) => payload.body.next)

export const $countAllFriends = createStore(0)
$countAllFriends.on(submitRequestFriendsListFx.doneData, (state, payload) => payload.body.count)
$countAllFriends.on(submitRequestFriendsListCountFx.doneData, (state, payload) => payload.body.count)

export const $countOnlineFriends = createStore(0)
$countOnlineFriends.on(submitRequestOnlineFriendsListFx.doneData, (state, payload) => payload.body.count)
$countOnlineFriends.on(submitRequestOnlineFriendsCountListFx.doneData, (state, payload) => payload.body.count)

//
const $canSendFriendCountRequest = combine(
  $token,
  $canLoadMore,
  submitRequestFriendsListCountFx.pending,
  (token, canLoadMore, sendRequestPending) => token.length > 0 && canLoadMore && !sendRequestPending
)
const $canSendFriendOnlineCountRequest = combine(
  $token,
  $canLoadMore,
  submitRequestOnlineFriendsCountListFx.pending,
  (token, canLoadMore, sendRequestPending) => token.length > 0 && canLoadMore && !sendRequestPending
)
//
const $canSendFriendRequest = combine(
  $token,
  $canLoadMore,
  submitRequestFriendsListFx.pending,
  (token, canLoadMore, sendRequestPending) => token.length > 0 && canLoadMore && !sendRequestPending
)
const $canSendFriendOnlineRequest = combine(
  $token,
  $canLoadMore,
  submitRequestOnlineFriendsListFx.pending,
  (token, canLoadMore, sendRequestPending) => token.length > 0 && canLoadMore && !sendRequestPending
)
const $canSendRemoveFromFriendRequest = combine(
  $token,
  submitRequestRemoveFromFriendsFx.pending,
  (token, sendRequestPending) => token.length > 0 && !sendRequestPending
)

// методы
// запись колличества сущностей при инициализации
sample({
  clock: fetchCountFriends,
  source: guard({ source: $prepareUserDataId, filter: $canSendFriendCountRequest }),
  target: submitRequestFriendsListCountFx
})
sample({
  clock: fetchCountOnlineFriends,
  source: guard({ source: $prepareUserDataId, filter: $canSendFriendOnlineCountRequest }),
  target: submitRequestOnlineFriendsCountListFx
})
// загрузка и запись друзей
sample({
  clock: loadAllFriends,
  source: guard({ source: $prepareUserDataId, filter: $canSendFriendRequest }),
  target: submitRequestFriendsListFx
})
sample({
  clock: loadOnlineFriends,
  source: guard({ source: $prepareUserDataId, filter: $canSendFriendOnlineRequest }),
  target: submitRequestOnlineFriendsListFx
})
// удалить из друзей
sample({
  clock: removeFromFriends,
  source: guard({ source: $friendData, filter: $canSendRemoveFromFriendRequest }),
  target: submitRequestRemoveFromFriendsFx
})

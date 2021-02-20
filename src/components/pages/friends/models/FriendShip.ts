import { attach, createEvent, combine, sample, forward, guard, createStore } from 'effector-root'
import { UserId, FriendId, CommonFxParams, User } from '@/api/types'
import { AddToFriendsFx } from '@/api/Friends'
import { ListFriendShipFx, RemoveFromFriendShipFx } from '@/api/FriendShip'
import { $token } from '@/api/common/AuthorizedRequest'
import {
  $friendData,
  $prepareFriendDataId,
  $prepareUserDataId,
  $canLoadMore,
  $page,
  loadListFriendShip,
  loadAllFriends,
  loadOnlineFriends,
  resetFriendShip
} from '@/App.module'

// эффекты
// получить список предложений в друзья
export const submitRequestFriendShipListFx = attach({
  source: $page,
  effect: ListFriendShipFx,
  mapParams: (params: UserId, page: number) => {
    const query = `offset=${page}&limit=9`
    return { ...params, query }
  }
})
// добавить в друзья
export const submitRequestAddToFriendsFx = attach({
  effect: AddToFriendsFx,
  mapParams: (params: CommonFxParams) => params
})
// удалить из предложений в друзья
export const submitRequestRemoveFromFriendShipFx = attach({
  effect: RemoveFromFriendShipFx,
  mapParams: (params: FriendId) => params
})

// события
export const removeFromFriendShip = createEvent()
export const addToFriends = createEvent()

// сторы
export const $friendShips = createStore<User[]>([])
$friendShips.on(submitRequestFriendShipListFx.doneData, (state, payload) => [...state, ...payload.body.results.map(item => ({ ...item, photo: item.photo || '' }))])
$friendShips.on(submitRequestAddToFriendsFx.doneData, (state, payload) => state.filter(item => item.id !== payload.body.user_id))
$friendShips.on(submitRequestRemoveFromFriendShipFx.doneData, (state, payload) => state.filter(item => item.id !== payload.body.user_id))
$friendShips.on(resetFriendShip, () => [])

export const $countFriendsShip = createStore(0)
$countFriendsShip.on(submitRequestFriendShipListFx.doneData, (state, payload) => payload.body.count)
$canLoadMore.on(submitRequestFriendShipListFx.doneData, (state, payload) => payload.body.next)

const $canSendFriendShipRequest = combine(
  $token,
  $canLoadMore,
  submitRequestFriendShipListFx.pending,
  (token, canLoadMore, sendRequestPending) => token.length > 0 && canLoadMore && !sendRequestPending
)
const $canSendAddToFriendRequest = combine(
  $token,
  submitRequestAddToFriendsFx.pending,
  (token, sendRequestPending) => token.length > 0 && !sendRequestPending
)
const $canSendRemoveFromFriendShipRequest = combine(
  $token,
  submitRequestRemoveFromFriendShipFx.pending,
  (token, sendRequestPending) => token.length > 0 && !sendRequestPending
)

// методы
// загрузка и запись предложений в друзья
sample({
  clock: loadListFriendShip,
  source: guard({ source: $prepareUserDataId, filter: $canSendFriendShipRequest }),
  target: submitRequestFriendShipListFx
})
// добавить в друзья
sample({
  clock: addToFriends,
  source: guard({ source: $friendData, filter: $canSendAddToFriendRequest }),
  target: submitRequestAddToFriendsFx
})
// forward({
//   from: submitRequestAddToFriendsFx.doneData,
//   to: [loadAllFriends, loadOnlineFriends]
// })
// удалить из предложений в друзья
sample({
  clock: removeFromFriendShip,
  source: guard({ source: $prepareFriendDataId, filter: $canSendRemoveFromFriendShipRequest }),
  target: submitRequestRemoveFromFriendShipFx
})

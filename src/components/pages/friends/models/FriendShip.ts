import { attach, createEvent, combine, sample, guard, createStore, createEffect } from 'effector-root'
import { UserId, CommonFxParams, User } from '@/api/types'
import { AddToFriendsFx } from '@/api/Friends'
import { ListFriendShipFx, RemoveFromFriendShipFx } from '@/api/FriendShip'
import { $token } from '@/api/common/AuthorizedRequest'
import {
  $friendData,
  $prepareUserDataId,
  $canLoadMore,
  $page,
  loadListFriendShip,
  $friendId,
  resetFriendShip
} from '@/App.module'
import { $profileUser } from '@/components/pages/profile/EditProfile.model'
import socket from '@/api/socket'

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
export const submitRequestFriendShipListCountFx = attach({
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
  mapParams: (params: CommonFxParams) => params
})
const sendSocketRemoveFromFriendshipFx = createEffect((data: { user: User, recipient: number }) => {
  socket.removeFromFriendShip(data)
})
const sendSocketAddtoFriendshipFx = createEffect((data: { user: User, recipient: number }) => {
  socket.addToFriend(data)
})

// события
export const fetchCountFriendShip = createEvent()
export const removeFromFriendShip = createEvent()
export const addToFriends = createEvent()

// сторы
export const addToFriendShipsChanged = createEvent<User>()
export const $friendShips = createStore<User[]>([]).reset(resetFriendShip)
$friendShips.on(addToFriendShipsChanged, (state, payload) => [...state, payload])
$friendShips.on(submitRequestFriendShipListFx.doneData, (state, payload) => [...state, ...payload.body.results.map(item => ({ ...item, photo: item.croped_photo || '' }))])
$friendShips.on(submitRequestAddToFriendsFx.doneData, (state, payload) => state.filter(item => item.user_id !== payload.body.user_id))
$friendShips.on(submitRequestRemoveFromFriendShipFx.doneData, (state, payload) => state.filter(item => item.user_id !== payload.body.user_id))

export const $countFriendsShip = createStore(0)
$countFriendsShip.on(submitRequestFriendShipListFx.doneData, (state, payload) => payload.body.count)
$countFriendsShip.on(submitRequestFriendShipListCountFx.doneData, (state, payload) => payload.body.count)
$countFriendsShip.on(submitRequestAddToFriendsFx.doneData, (state) => --state)
$countFriendsShip.on(submitRequestRemoveFromFriendShipFx.doneData, (state) => --state)
$countFriendsShip.on(addToFriendShipsChanged, (state) => ++state)
$canLoadMore.on(submitRequestFriendShipListFx.doneData, (state, payload) => payload.body.next)

const $canSendFriendShipRequest = combine(
  $token,
  $canLoadMore,
  submitRequestFriendShipListFx.pending,
  (token, canLoadMore, sendRequestPending) => token.length > 0 && canLoadMore && !sendRequestPending
)
const $canSendFriendShipCountRequest = combine(
  $token,
  $canLoadMore,
  submitRequestFriendShipListCountFx.pending,
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
// кол-во записей
sample({
  clock: fetchCountFriendShip,
  source: guard({ source: $prepareUserDataId, filter: $canSendFriendShipCountRequest }),
  target: submitRequestFriendShipListCountFx
})
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
sample({
  clock: submitRequestAddToFriendsFx.doneData,
  source: { user: $profileUser, recipient: $friendId },
  target: sendSocketAddtoFriendshipFx
})
// удалить из предложений в друзья
sample({
  clock: removeFromFriendShip,
  source: guard({ source: $friendData, filter: $canSendRemoveFromFriendShipRequest }),
  target: submitRequestRemoveFromFriendShipFx
})
sample({
  clock: submitRequestRemoveFromFriendShipFx.doneData,
  source: { user: $profileUser, recipient: $friendId },
  target: sendSocketRemoveFromFriendshipFx
})
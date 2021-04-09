import { attach, createEvent, sample, guard, combine, createStore } from 'effector-root'
import { UserId, AllUsersInGrid, CommonFxParams } from '@/api/types'
import { ListUsersFx } from '@/api/Friends'
import { AddToFriendShipFx } from '@/api/FriendShip'
import { $friendData, $prepareUserDataId, $canLoadMore, $page, loadListUsers, resetUsers } from '@/App.module'
import { $token } from '@/api/common/AuthorizedRequest'

// эффекты
// получить список пользователей
export const submitRequestUsersListFx = attach({
  source: $page,
  effect: ListUsersFx,
  mapParams: (params: UserId, page: number) => {
    const query = `offset=${page}&limit=9`
    return { ...params, query }
  }
})
// добавить в friendShip
export const submitRequestAddToFriendShipFx = attach({
  effect: AddToFriendShipFx,
  mapParams: (params: CommonFxParams) => params
})

// события
export const addToFriendShip = createEvent()

// сторы
export const $users = createStore<AllUsersInGrid[]>([]).reset(resetUsers)
$users.on(submitRequestUsersListFx.doneData, (state, payload) => [...state, ...payload.body.results.map(item => ({ ...item, photo: item.original_photo || '' }))])
$users.on(submitRequestAddToFriendShipFx.doneData, (state, payload) => {
  const elementId = state.findIndex(item => item.user_id === payload.body.user_id)
  if (elementId > -1) {
    const element = state[elementId]
    state.splice(elementId, 1, { ...element, exist_in_friend_list: true })
    return [...state]
  }
  return state
})
$canLoadMore.on(submitRequestUsersListFx.doneData, (state, payload) => payload.body.next)

const $canSendUserRequest = combine(
  $token,
  $canLoadMore,
  submitRequestUsersListFx.pending,
  (token, canLoadMore, sendRequestPending) => token.length > 0 && canLoadMore && !sendRequestPending
)
const $canSendAddToFriendShipRequest = combine(
  $token,
  submitRequestAddToFriendShipFx.pending,
  (token, sendRequestPending) => token.length > 0 && !sendRequestPending
)

// методы
// загрузка и запись всех пользователей
sample({
  clock: loadListUsers,
  source: guard({ source: $prepareUserDataId, filter: $canSendUserRequest }),
  target: submitRequestUsersListFx
})
// добавить предложение в друзья
sample({
  clock: addToFriendShip,
  source: guard({ source: $friendData, filter: $canSendAddToFriendShipRequest }),
  target: submitRequestAddToFriendShipFx
})

import { attach, createEvent, sample, guard, combine, createStore } from 'effector-root'
import { UserInGrid, CommonFxParams } from '@/api/types'
import { ListUsersFx } from '@/api/Friends'
import { AddToFriendShipFx } from '@/api/FriendShip'
import { $friendData, $prepareUserDataId, $canLoadMore, $page } from '@/App.module'
import { $token } from '@/api/common/AuthorizedRequest'

// эффекты
// получить список пользователей
export const submitRequestUsersListFx = attach({
  source: $page,
  effect: ListUsersFx,
  mapParams: (params: { userId: number }, page: number) => {
    const query = `page=${page}&limit=9`
    return { ...params, query }
  }
})
// добавить в friendShip
export const submitRequestAddToFriendShipFx = attach({
  effect: AddToFriendShipFx,
  mapParams: (params: CommonFxParams) => params
})

// события
export const loadListUsers = createEvent()
export const addToFriendShip = createEvent()
export const resetUsers = createEvent()

// сторы
export const $users = createStore<UserInGrid[]>([])
$users.on(submitRequestUsersListFx.doneData, (state, payload) => [...state, ...payload.body.results])
$users.on(submitRequestAddToFriendShipFx.doneData, (state, payload) => {
  const elementId = state.findIndex(item => item.id === payload.body.userId)
  if (elementId > -1) {
    const element = state[elementId]
    state.splice(elementId, 1, { ...element, existInFriendList: true })
    return state
  }
})
$users.on(resetUsers, () => [])
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

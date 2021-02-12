import { attach, createEvent, createEffect, sample, guard, combine, forward } from 'effector-root'
import { createEffectorField } from '@/helpers/effector-field'
import { UserInGrid, CommonFxParams } from '@/api/types'
import { ListUsersFx } from '@/api/Friends'
import { AddToFriendShipFx } from '@/api/FriendShip'
import { $friendData, $page, pageChanged, $friendId, $prepareDataGetRequest, $canLoadMore, canLoadMoreChanged } from '@/App.module'
import { $token } from '@/api/common/AuthorizedRequest'

// эффекты
// получить список пользователей
export const submitRequestUsersListFx = attach({
  effect: ListUsersFx,
  mapParams: (params: { userId: number, page: number }) => {
    const query = `page=${params.page}&limit=9`
    return { ...params, query }
  }
})
// добавить в friendShip
export const submitRequestAddToFriendShipFx = attach({
  effect: AddToFriendShipFx,
  mapParams: (params: CommonFxParams) => params
})
const changeListUsersFx = createEffect(({ userId, userList }: { userId: number, userList: UserInGrid[] }) => {
  const elementId = userList.findIndex(item => item.id === userId)
  if (elementId > -1) {
    const element = userList[elementId]
    userList.splice(elementId, 1, { ...element, existInFriendList: true })
    usersChanged([...userList])
  }
})

// события
export const loadListUsers = createEvent()
export const addToFriendShip = createEvent()

// сторы
export const [$users, usersChanged] = createEffectorField<UserInGrid[]>({ defaultValue: [] })
export const $canSendUserRequest = combine(
  $token,
  $canLoadMore,
  submitRequestUsersListFx.pending,
  (token, canLoadMore, sendRequestPending) => token.length > 0 && canLoadMore && !sendRequestPending
)
export const $canSendAddToFriendShipRequest = combine(
  $token,
  submitRequestAddToFriendShipFx.pending,
  (token, sendRequestPending) => token.length > 0 && !sendRequestPending
)

// методы
// загрузка и запись всех пользователей
sample({
  clock: loadListUsers,
  source: guard({ source: $prepareDataGetRequest, filter: $canSendUserRequest }),
  target: submitRequestUsersListFx
})
forward({
  from: loadListUsers,
  to: [
    canLoadMoreChanged.prepend(() => false),
    pageChanged.prepend(() => $page.getState() + 1)
  ]
})
forward({
  from: submitRequestUsersListFx.doneData,
  to: [
    usersChanged.prepend(({ body }: any) => [...$users.getState(), ...body.users]),
    canLoadMoreChanged.prepend(() => true)
  ]
})
// добавить предложение в друзья
sample({
  clock: addToFriendShip,
  source: guard({ source: $friendData, filter: $canSendAddToFriendShipRequest }),
  target: submitRequestAddToFriendShipFx
})
sample({
  clock: submitRequestAddToFriendShipFx.doneData,
  source: { userId: $friendId, userList: $users },
  target: changeListUsersFx
})

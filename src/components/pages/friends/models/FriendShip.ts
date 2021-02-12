import { attach, createEvent, createEffect, combine, sample, forward, guard } from 'effector-root'
import { createEffectorField } from '@/helpers/effector-field'
import { CommonFxParams, UserId, User } from '@/api/types'
import { AddToFriendsFx } from '@/api/Friends'
import { loadAllFriends, loadOnlineFriends } from '@/components/pages/friends/models/Friends'
import { ListFriendShipFx, RemoveFromFriendShipFx } from '@/api/FriendShip'
import { $token } from '@/api/common/AuthorizedRequest'
import { $friendData, $prepareUserDataId, $friendId, $canLoadMore } from '@/App.module'

// эффекты
// получить список предложений в друзья
export const submitRequestFriendShipListFx = attach({
  effect: ListFriendShipFx,
  mapParams: (params: UserId) => params
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
const changeListFriendShipFx = createEffect(({ userId, userList }: { userId: number, userList: User[] }) => {
  const newList = userList.filter(item => item.id !== userId)
  friendShipsChanged(newList)
  countFriendsShipChanged(newList.length)
})

// события
export const loadListFriendShip = createEvent()
export const removeFromFriendShip = createEvent()
export const addToFriends = createEvent()

// сторы
export const [$friendShips, friendShipsChanged] = createEffectorField<User[]>({ defaultValue: [] })
export const [$countFriendsShip, countFriendsShipChanged] = createEffectorField({ defaultValue: 0 })
export const $canSendFriendShipRequest = combine(
  $token,
  $canLoadMore,
  submitRequestFriendShipListFx.pending,
  (token, canLoadMore, sendRequestPending) => token.length > 0 && canLoadMore && !sendRequestPending
)
export const $canSendAddToFriendRequest = combine(
  $token,
  submitRequestAddToFriendsFx.pending,
  (token, sendRequestPending) => token.length > 0 && !sendRequestPending
)
export const $canSendRemoveFromFriendShipRequest = combine(
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
forward({
  from: submitRequestFriendShipListFx.doneData,
  to: [
    friendShipsChanged.prepend(({ body }: any) => body.users),
    countFriendsShipChanged.prepend(({ body }: any) => body.users.length)
  ]
})
// добавить из друзья
sample({
  clock: addToFriends,
  source: guard({ source: $friendData, filter: $canSendAddToFriendRequest }),
  target: submitRequestAddToFriendsFx
})
sample({
  clock: submitRequestAddToFriendsFx.doneData,
  source: { userId: $friendId, userList: $friendShips },
  target: changeListFriendShipFx
})
forward({
  from: submitRequestAddToFriendsFx.doneData,
  to: [loadAllFriends, loadOnlineFriends]
})
// удалить из предложений в друзья
sample({
  clock: removeFromFriendShip,
  source: guard({ source: $friendData, filter: $canSendRemoveFromFriendShipRequest }),
  target: submitRequestRemoveFromFriendShipFx
})

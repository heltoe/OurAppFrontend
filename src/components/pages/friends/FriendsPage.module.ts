import { attach, createEvent, sample, guard, combine, forward } from 'effector-root'
import { User, UserInGrid, CommonFxParams, UserId } from '@/api/types'
import { AddToFriendsFx, RemoveFromFriendsFx, ListFriendsFx, ListUsersFx } from '@/api/Friends'
import { AddToFriendShipFx, RemoveFromFriendShipFx } from '@/api/FriendShip'
import { ListFriendShipFx } from '@/api/FriendShip'
import { createEffectorField } from '@/helpers/effector-field'
import { $prepareUserDataId, $idUser } from '@/App.module'
import { $token } from '@/api/common/AuthorizedRequest'

// эффекты
// получить список пользователей
export const submitRequestUsersListFx = attach({
  effect: ListUsersFx,
  mapParams: (params: UserId) => params
})
// получить список friendship
export const submitRequestFriendShipListFx = attach({
  effect: ListFriendShipFx,
  mapParams: (params: CommonFxParams) => params
})
// добавить в friendShip
export const submitRequestAddToFriendShipFx = attach({
  effect: AddToFriendShipFx,
  mapParams: (params: CommonFxParams) => params
})
// удалить с friendShip
export const submitRequestRemoveFromFriendShipFx = attach({
  effect: RemoveFromFriendShipFx,
  mapParams: (params: CommonFxParams) => params
})
// получить список друзей
export const submitRequestFriendsListFx = attach({
  effect: ListFriendsFx,
  mapParams: (params: UserId) => params
})
// добавить в друзья
export const submitRequestAddToFriendsFx = attach({
  effect: AddToFriendsFx,
  mapParams: (params: CommonFxParams) => params
})
// удалить с друзей
export const submitRequestRemoveFromFriendsFx = attach({
  effect: RemoveFromFriendsFx,
  mapParams: (params: CommonFxParams) => params
})

// const setFriendsListFx = createEffect(({ body }: Response<ListFriendsFxResponse>) => {
//   usersChanged(body.friends)
//   countAllFriendsChanged(body.friends.length)
//   countOnlineFriendsChanged(body.friends.length)
// })

// события
// загрузка списков
export const loadAllFriends = createEvent()
export const loadOnlineFriends = createEvent()
export const loadListFriendShip = createEvent()
export const loadListUsers = createEvent()
export const loadLists = {
  all: loadAllFriends,
  online: loadOnlineFriends,
  friendShip: loadListFriendShip,
  users: loadListUsers
}
// обработчики кликеров
export const addToFriendShip = createEvent()
export const removeFromFriendShip = createEvent()
export const addToFriends = createEvent()
export const removeFromFriends = createEvent()
export const clickHandlers = {
  addToFriendShip,
  removeFromFriendShip,
  addToFriends,
  removeFromFriends
}

// сторы
export const [$typePage, typePageChanged] = createEffectorField({ defaultValue: 'all' })
export const [$users, usersChanged] = createEffectorField<UserInGrid[]>({ defaultValue: [] })
export const [$allFriends, allFriendsChanged] = createEffectorField<User[]>({ defaultValue: [] })
export const [$onlineFriends, onlineFriendsChanged] = createEffectorField<User[]>({ defaultValue: [] })
export const [$friendShips, friendShipsChanged] = createEffectorField<User[]>({ defaultValue: [] })
export const [$friendId, friendIdChanged] = createEffectorField({ defaultValue: 0 })
export const $friendData = combine({
  userId: $idUser,
  friendId: $friendId,
})
export const $friendsGrid = combine({
  all: $allFriends,
  online: $onlineFriends,
  friendship: $friendShips
})
export const [$countAllFriends, countAllFriendsChanged] = createEffectorField({ defaultValue: 0 })
export const [$countOnlineFriends, countOnlineFriendsChanged] = createEffectorField({ defaultValue: 0 })
export const [$countFriendsShip, countFriendsShipChanged] = createEffectorField({ defaultValue: 0 })
export const $counter = combine({
  all: $countAllFriends,
  online: $countOnlineFriends,
  friendship: $countFriendsShip
})
export const $canSendFriendRequest = combine(
  $token,
  submitRequestFriendsListFx.pending,
  (token, sendRequestPending) => token.length > 0 && !sendRequestPending
)
export const $canSendFriendShipRequest = combine(
  $token,
  submitRequestFriendShipListFx.pending,
  (token, sendRequestPending) => token.length > 0 && !sendRequestPending
)
export const $canSendUserRequest = combine(
  submitRequestUsersListFx.pending,
  (sendRequestPending) => !sendRequestPending
)
// методы
// загрузка и запись друзей
sample({
  clock: loadLists.all,
  source: guard({ source: $prepareUserDataId, filter: $canSendFriendRequest }),
  target: submitRequestFriendsListFx
})
forward({
  from: submitRequestFriendsListFx.doneData,
  to: [
    allFriendsChanged.prepend(({ body }: any) => body.friends),
    countAllFriendsChanged.prepend(({ body }: any) => body.friends.length)
  ]
})
sample({
  clock: loadLists.online,
  source: guard({ source: $prepareUserDataId, filter: $canSendFriendRequest }),
  target: submitRequestFriendsListFx
})
forward({
  from: submitRequestFriendsListFx.doneData,
  to: [
    onlineFriendsChanged.prepend(({ body }: any) => body.friends),
    countOnlineFriendsChanged.prepend(({ body }: any) => body.friends.length)
  ]
})
// загрузка и запись предложений в друзья
sample({
  clock: loadLists.friendShip,
  source: guard({ source: $friendData, filter: $canSendFriendShipRequest }),
  target: submitRequestFriendShipListFx
})
forward({
  from: submitRequestFriendShipListFx.doneData,
  to: [
    friendShipsChanged.prepend(({ body }: any) => body.users),
    countFriendsShipChanged.prepend(({ body }: any) => body.users.length)
  ]
})
// загрузка и запись всех пользователей
sample({
  clock: loadLists.users,
  source: guard({ source: $prepareUserDataId, filter: $canSendUserRequest }),
  target: submitRequestUsersListFx
})
forward({
  from: submitRequestUsersListFx.doneData,
  to: usersChanged.prepend(({ body }: any) => body.users)
})
// добавить в friendShip
sample({
  clock: clickHandlers.addToFriendShip,
  source: guard({ source: $friendData, filter: $canSendUserRequest }),
  target: submitRequestAddToFriendShipFx
})
// удалить из friendShip
sample({
  clock: clickHandlers.removeFromFriendShip,
  source: guard({ source: $friendData, filter: $canSendUserRequest }),
  target: submitRequestRemoveFromFriendShipFx
})
// добавить из друзья
sample({
  clock: clickHandlers.addToFriends,
  source: guard({ source: $friendData, filter: $canSendUserRequest }),
  target: submitRequestAddToFriendsFx
})
// удалить из друзья
sample({
  clock: clickHandlers.removeFromFriends,
  source: guard({ source: $friendData, filter: $canSendUserRequest }),
  target: submitRequestRemoveFromFriendsFx
})

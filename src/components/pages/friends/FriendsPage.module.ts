import { attach, createEvent, sample, guard, combine, forward } from 'effector-root'
import { User, CommonFxParams, UserId } from '@/api/types'
import { ListFriendsFx, ListUsersFx } from '@/api/Friends'
import { AddToFriendShipFx } from '@/api/FriendShip'
import { ListFriendShipFx } from '@/api/FriendShip'
import { createEffectorField } from '@/helpers/effector-field'
import { $prepareUserDataId, $idUser } from '@/App.module'
import { $token } from '@/api/common/AuthorizedRequest'

// эффекты
export const submitRequestFriendsListFx = attach({
  effect: ListFriendsFx,
  mapParams: (params: UserId) => params
})
export const submitRequestFriendShipListFx = attach({
  effect: ListFriendShipFx,
  mapParams: (params: CommonFxParams) => params
})
export const submitRequestUsersListFx = attach({
  effect: ListUsersFx,
  mapParams: (params: UserId) => params
})
// добавить в friendShip
export const submitRequestAddToFriendShipFx = attach({
  effect: AddToFriendShipFx,
  mapParams: (params: CommonFxParams) => params
})
// const setFriendsListFx = createEffect(({ body }: Response<ListFriendsFxResponse>) => {
//   usersChanged(body.friends)
//   countAllFriendsChanged(body.friends.length)
//   countOnlineFriendsChanged(body.friends.length)
// })

// события
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
//
export const addToFriendShip = createEvent()

// сторы
export const [$typePage, typePageChanged] = createEffectorField({ defaultValue: 'all' })
export const [$users, usersChanged] = createEffectorField<User[]>({ defaultValue: [] })
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
  clock: loadAllFriends,
  source: guard({ source: $prepareUserDataId, filter: $canSendFriendRequest }),
  target: submitRequestFriendsListFx
})
forward({
  from: submitRequestFriendsListFx.doneData,
  to: [
    allFriendsChanged.prepend(({ body }: any) => body.friends),
    countFriendsShipChanged.prepend(({ body }: any) => body.friends.length)
  ]
})
sample({
  clock: loadOnlineFriends,
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
  clock: loadListFriendShip,
  source: guard({ source: $friendData, filter: $canSendFriendShipRequest }),
  target: submitRequestFriendShipListFx
})
forward({
  from: submitRequestFriendShipListFx.doneData,
  to: [
    friendShipsChanged.prepend(({ body }: any) => body.users),
    countAllFriendsChanged.prepend(({ body }: any) => body.users.length)
  ]
})
// загрузка и запись всех пользователей
sample({
  clock: loadListUsers,
  source: guard({ source: $prepareUserDataId, filter: $canSendUserRequest }),
  target: submitRequestUsersListFx
})
forward({
  from: submitRequestUsersListFx.doneData,
  to: usersChanged.prepend(({ body }: any) => body.users)
})
// добавить в friendShip
sample({
  clock: addToFriendShip,
  source: guard({ source: $friendData, filter: $canSendUserRequest }),
  target: submitRequestAddToFriendShipFx
})
// forward({
//   from: submitRequestUsersListFx.doneData,
//   to: usersChanged.prepend(() => [])
// })

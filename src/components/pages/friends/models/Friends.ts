import { attach, createEvent, combine, sample, forward, guard } from 'effector-root'
import { createEffectorField } from '@/helpers/effector-field'
import { User, UserId, CommonFxParams } from '@/api/types'
import { RemoveFromFriendsFx, ListFriendsFx } from '@/api/Friends'
import { $friendData, $prepareUserDataId, $canLoadMore } from '@/App.module'
import { $token } from '@/api/common/AuthorizedRequest'

// эффекты
// получить список друзей
export const submitRequestFriendsListFx = attach({
  effect: ListFriendsFx,
  mapParams: (params: UserId) => params
})
// удалить с друзей
export const submitRequestRemoveFromFriendsFx = attach({
  effect: RemoveFromFriendsFx,
  mapParams: (params: CommonFxParams) => params
})

// события
export const loadAllFriends = createEvent()
export const loadOnlineFriends = createEvent()
export const removeFromFriends = createEvent()

// сторы
export const [$allFriends, allFriendsChanged] = createEffectorField<User[]>({ defaultValue: [] })
export const [$onlineFriends, onlineFriendsChanged] = createEffectorField<User[]>({ defaultValue: [] })
export const [$countAllFriends, countAllFriendsChanged] = createEffectorField({ defaultValue: 0 })
export const [$countOnlineFriends, countOnlineFriendsChanged] = createEffectorField({ defaultValue: 0 })
export const $canSendFriendRequest = combine(
  $token,
  $canLoadMore,
  submitRequestFriendsListFx.pending,
  (token, canLoadMore, sendRequestPending) => token.length > 0 && canLoadMore && !sendRequestPending
)
export const $canSendRemoveFromFriendRequest = combine(
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
forward({
  from: submitRequestFriendsListFx.doneData,
  to: [
    allFriendsChanged.prepend(({ body }: any) => body.friends),
    countAllFriendsChanged.prepend(({ body }: any) => body.friends.length)
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
// удалить из друзей
sample({
  clock: removeFromFriends,
  source: guard({ source: $friendData, filter: $canSendRemoveFromFriendRequest }),
  target: submitRequestRemoveFromFriendsFx
})
forward({
  from: submitRequestRemoveFromFriendsFx.doneData,
  to: [loadAllFriends, loadOnlineFriends]
})

import { attach, createEvent, combine, sample, forward, guard } from 'effector-root'
import { createEffectorField } from '@/helpers/effector-field'
import { User, CommonFxParams } from '@/api/types'
import { RemoveFromFriendsFx, ListFriendsFx } from '@/api/Friends'
import { $friendData, $prepareDataGetRequest, $canLoadMore, $page } from '@/App.module'
import { $token } from '@/api/common/AuthorizedRequest'

// эффекты
// получить список друзей
export const submitRequestFriendsListFx = attach({
  effect: ListFriendsFx,
  mapParams: (params: { userId: number, page: number }) => {
    const query = `page=${$page.getState()}&limit=9`
    return { ...params, query }
  }
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
export const resetAllFriends = createEvent()
export const resetOnlineFriends = createEvent()

// сторы
export const [$allFriends, allFriendsChanged] = createEffectorField<User[]>({ defaultValue: [], reset: resetAllFriends })
export const [$onlineFriends, onlineFriendsChanged] = createEffectorField<User[]>({ defaultValue: [], reset: resetOnlineFriends })
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
  source: guard({ source: $prepareDataGetRequest, filter: $canSendFriendRequest }),
  target: submitRequestFriendsListFx
})
forward({
  from: submitRequestFriendsListFx.doneData,
  to: [
    allFriendsChanged.prepend(({ body }) => [...$allFriends.getState(), ...body.results]),
    countAllFriendsChanged.prepend(({ body }) => body.count)
  ]
})
sample({
  clock: loadOnlineFriends,
  source: guard({ source: $prepareDataGetRequest, filter: $canSendFriendRequest }),
  target: submitRequestFriendsListFx
})
forward({
  from: submitRequestFriendsListFx.doneData,
  to: [
    allFriendsChanged.prepend(({ body }) => [...$onlineFriends.getState(), ...body.results]),
    countOnlineFriendsChanged.prepend(({ body }) => body.count)
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

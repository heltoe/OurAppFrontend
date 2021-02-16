import { attach, createEvent, combine, sample, forward, guard, createStore, split } from 'effector-root'
import { UserId, CommonFxParams, User } from '@/api/types'
import { AddToFriendsFx } from '@/api/Friends'
import { loadAllFriends, loadOnlineFriends } from '@/components/pages/friends/models/Friends'
import { ListFriendShipFx, RemoveFromFriendShipFx } from '@/api/FriendShip'
import { $token } from '@/api/common/AuthorizedRequest'
import { $friendData, $prepareUserDataId, $canLoadMore, $page, typePages, $prepareDataToInfinityScroll } from '@/App.module'

// эффекты
// получить список предложений в друзья
export const submitRequestFriendShipListFx = attach({
  source: $page,
  effect: ListFriendShipFx,
  mapParams: (params: UserId, page: number) => {
    const query = `page=${page}&limit=9`
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

// события
export const loadListFriendShip = createEvent()
export const removeFromFriendShip = createEvent()
export const addToFriends = createEvent()
export const resetFriendShip = createEvent()
// сторы
export const $friendShips = createStore<User[]>([])
$friendShips.on(submitRequestFriendShipListFx.doneData, (state, payload) => [...state, ...payload.body.results])
$friendShips.on(submitRequestAddToFriendsFx.doneData, (state, payload) => state.filter(item => item.id !== payload.body.userId))
$friendShips.on(submitRequestRemoveFromFriendShipFx.doneData, (state, payload) => state.filter(item => item.id !== payload.body.userId))
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
split({
  source: $prepareDataToInfinityScroll,
  match: { friendShips: ({ typePage }) => typePage === typePages.friendship },
  // @ts-ignore
  cases: { friendShips: loadListFriendShip }
})
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

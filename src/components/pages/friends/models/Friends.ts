import { attach, createEvent, combine, sample, guard, createStore, split } from 'effector-root'
import { UserId, User, CommonFxParams } from '@/api/types'
import { RemoveFromFriendsFx, ListFriendsFx } from '@/api/Friends'
import { $friendData, $prepareUserDataId, $canLoadMore, $page, typePages, $prepareDataToInfinityScroll } from '@/App.module'
import { $token } from '@/api/common/AuthorizedRequest'

// эффекты
// получить список друзей
export const submitRequestFriendsListFx = attach({
  source: $page,
  effect: ListFriendsFx,
  mapParams: (params: UserId, page: number) => {
    const query = `page=${page}&limit=9`
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
export const $allFriends = createStore<User[]>([])
$allFriends.on(submitRequestFriendsListFx.doneData, (state, payload) => [...state, ...payload.body.results])
$allFriends.on(submitRequestRemoveFromFriendsFx.doneData, (state, payload) => state.filter(item => item.id !== payload.body.userId))
$allFriends.on(resetAllFriends, () => [])

export const $onlineFriends = createStore<User[]>([])
$onlineFriends.on(submitRequestFriendsListFx.doneData, (state, payload) => [...state, ...payload.body.results])
$onlineFriends.on(submitRequestRemoveFromFriendsFx.doneData, (state, payload) => state.filter(item => item.id !== payload.body.userId))
$onlineFriends.on(resetOnlineFriends, () => [])

$canLoadMore.on(submitRequestFriendsListFx.doneData, (state, payload) => payload.body.next)

export const $countAllFriends = createStore(0)
$countAllFriends.on(submitRequestFriendsListFx.doneData, (state, payload) => payload.body.count)

export const $countOnlineFriends = createStore(0)
$countOnlineFriends.on(submitRequestFriendsListFx.doneData, (state, payload) => payload.body.count)

const $canSendFriendRequest = combine(
  $token,
  $canLoadMore,
  submitRequestFriendsListFx.pending,
  (token, canLoadMore, sendRequestPending) => token.length > 0 && canLoadMore && !sendRequestPending
)
const $canSendRemoveFromFriendRequest = combine(
  $token,
  submitRequestRemoveFromFriendsFx.pending,
  (token, sendRequestPending) => token.length > 0 && !sendRequestPending
)

// методы
// загрузка и запись друзей
split({
  source: $prepareDataToInfinityScroll,
  match: {
    allFriends: ({ typePage }) => typePage === typePages.friends,
    onlineFriends: ({ typePage }) => typePage === typePages.online,
  },
  cases: {
    // @ts-ignore
    allFriends: loadAllFriends,
    // @ts-ignore
    onlineFriends: loadOnlineFriends
  }
})
sample({
  clock: loadAllFriends,
  source: guard({ source: $prepareUserDataId, filter: $canSendFriendRequest }),
  target: submitRequestFriendsListFx
})
sample({
  clock: loadOnlineFriends,
  source: guard({ source: $prepareUserDataId, filter: $canSendFriendRequest }),
  target: submitRequestFriendsListFx
})
// удалить из друзей
sample({
  clock: removeFromFriends,
  source: guard({ source: $friendData, filter: $canSendRemoveFromFriendRequest }),
  target: submitRequestRemoveFromFriendsFx
})

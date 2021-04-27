import {
  combine,
  createEffect,
  createEvent,
  restore,
  split,
  sample,
} from 'effector-root'
import { User } from '@/api/types'
import { $token } from '@/api/common/AuthorizedRequest'

export const changeSendlerCallUser = createEvent<User | null>()
export const $sendlerCallUser = restore(changeSendlerCallUser, null)

export const changeRecipientCallUser = createEvent<User | null>()
export const $recipientCallUser = restore(changeRecipientCallUser, null)

export const setIdUser = createEvent<number>()
export const $userId = restore(setIdUser, 0)
export const friendIdChanged = createEvent<number>()
export const $friendId = restore(friendIdChanged, 0)

export const changeActiveUser = createEvent<User>()
export const $activeUser = restore(changeActiveUser, {
  user_id: 0,
  first_name: '',
  last_name: '',
  gender: '',
  birth_date: new Date(),
  original_photo: '',
  croped_photo: '',
  phone: '',
})

export const $preparePersonDataId = combine({ id: $userId })
export const $preparePersonalDataToken = combine({ token: $token })
export const $combinePersonalData = combine({ id: $userId, token: $token })
export const $prepareUserDataId = combine({ user_id: $userId })
export const $prepareFriendDataId = combine({ friend_id: $friendId })
export const $friendData = combine({
  user_id: $userId,
  friend_id: $friendId,
})

export const typePages = {
  friends: 'friends',
  online: 'online',
  friendship: 'friendship',
  findFriend: 'findFriend',
}
export const typePageChanged = createEvent<string>()
export const $typePage = restore(typePageChanged, typePages.friends)

export const pageChanged = createEvent<number>()
export const $page = restore(pageChanged, 0)
$page.on(typePageChanged, () => 0)

export const canLoadMoreChanged = createEvent<boolean>()
export const $canLoadMore = restore(canLoadMoreChanged, true)

export const $prepareDataToInfinityScroll = combine({
  page: $page,
  typePage: $typePage,
})

export const loadListUsers = createEvent()
export const resetUsers = createEvent()

export const loadListFriendShip = createEvent()
export const resetFriendShip = createEvent()

export const loadAllFriends = createEvent()
export const resetAllFriends = createEvent()

export const loadOnlineFriends = createEvent()
export const resetOnlineFriends = createEvent()

export const resetListsUsers = createEvent()

const callRestFieldsFx = createEffect((type: string) => {
  const resetMethods = {
    friends: resetAllFriends,
    online: resetOnlineFriends,
    friendship: resetFriendShip,
    findFriend: resetUsers,
  }
  Object.keys(resetMethods).forEach((item) => {
    // @ts-ignore
    if (item !== type && resetMethods[item]) resetMethods[item]()
  })
})
sample({
  clock: resetListsUsers,
  source: $typePage,
  target: callRestFieldsFx,
})
split({
  source: $prepareDataToInfinityScroll,
  match: {
    users: ({ typePage }) => typePage === typePages.findFriend,
    friendShips: ({ typePage }) => typePage === typePages.friendship,
    allFriends: ({ typePage }) => typePage === typePages.friends,
    onlineFriends: ({ typePage }) => typePage === typePages.online,
  },
  cases: {
    // @ts-ignore
    users: [loadListUsers, resetListsUsers],
    // @ts-ignore
    friendShips: [loadListFriendShip, resetListsUsers],
    // @ts-ignore
    allFriends: [loadAllFriends, resetListsUsers],
    // @ts-ignore
    onlineFriends: [loadOnlineFriends, resetListsUsers]
  },
})

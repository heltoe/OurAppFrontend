import { combine } from 'effector-root'
import { createEffectorField } from '@/helpers/effector-field'
import {
  $allFriends,
  $onlineFriends,
  $countAllFriends,
  $countOnlineFriends,
  loadAllFriends,
  loadOnlineFriends,
  removeFromFriends
} from '@/components/pages/friends/models/Friends'
import {
  $friendShips,
  $countFriendsShip,
  loadListFriendShip,
  removeFromFriendShip,
  addToFriends
} from '@/components/pages/friends/models/FriendShip'
import { $users, loadListUsers, addToFriendShip } from '@/components/pages/friends/models/Users'
import { $idUser } from '@/App.module'

// сторы
// для загрузки записей при скроллинге
export const [$page, pageChanged] = createEffectorField({ defaultValue: 1 })
export const [$canLoadMore, canLoadMoreChanged] = createEffectorField({ defaultValue: true })

export const [$typePage, typePageChanged] = createEffectorField({ defaultValue: 'all' })

export const [$friendId, friendIdChanged] = createEffectorField({ defaultValue: 0 })

export const $prepareDataGetRequest = combine({
  userId: $idUser,
  page: $page
})
// загрузка списков
export const loadLists = {
  friends: loadAllFriends,
  online: loadOnlineFriends,
  friendShip: loadListFriendShip,
  users: loadListUsers
}
// обработчики кликеров
export const clickHandlers = {
  addToFriendShip,
  removeFromFriendShip,
  addToFriends,
  removeFromFriends
}
export const $friendData = combine({
  userId: $idUser,
  friendId: $friendId,
})
export const $friendsGrid = combine({
  friends: $allFriends,
  online: $onlineFriends,
  friendship: $friendShips,
  users: $users
})
export const $counter = combine({
  friends: $countAllFriends,
  online: $countOnlineFriends,
  friendship: $countFriendsShip
})

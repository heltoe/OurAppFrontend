import { attach, createStore, createEvent, sample, guard, combine, restore } from 'effector-root'
import { ListChatsFx } from '@/api/Chat'
import { $token } from '@/api/common/AuthorizedRequest'
import { UserId, ChatItem } from '@/api/types'
import { $prepareUserDataId } from '@/App.module'

export const pageChanged = createEvent<number>()
export const $page = restore(pageChanged, 0)
// эффекты
// инфо сообщений пользователя
export const submitRequestListChatFx = attach({
  source: $page,
  effect: ListChatsFx,
  mapParams: (params: UserId, page: number) => {
    const query = `offset=${page}&limit=20`
    return { ...params, query }
  }
})

// события
export const fetchListChat = createEvent()
export const fetchMoreChats = createEvent()
$page.on(fetchListChat, () => 0)
$page.on(fetchMoreChats, (state) => state + 1)

// сторы
const listChatChanged = createEvent<ChatItem[]>()
export const $listChat = restore(listChatChanged, [])
$listChat.on(submitRequestListChatFx.doneData, (state, payload) => [...state, ...payload.body.results])

export const $canLoadMore = createStore(false)
$canLoadMore.on(submitRequestListChatFx.doneData, (state, payload) => payload.body.next)

export const $canSendListChatRequest = combine(
  $token,
  submitRequestListChatFx.pending,
  (token, sendRequestPending) => token.length > 0 && !sendRequestPending
)

// методы
sample({
  clock: fetchListChat,
  source: guard({ source: $prepareUserDataId, filter: $canSendListChatRequest }),
  target: submitRequestListChatFx
})

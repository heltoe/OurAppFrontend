import {
  createEvent,
  attach,
  combine,
  sample,
  guard,
  restore,
  forward,
  createStore,
  createEffect,
} from 'effector-root'
import {
  ListChatFxParams,
  Message,
  SendMessageFxParams,
  User,
} from '@/api/types'
import { ListMessagesFx, SendMessagesFx } from '@/api/Chat'
import { $profileUser } from '@/components/pages/profile/EditProfile.model'
import { changeLastMessage } from '@/components/common/sidebar/SideBar.model'
import { ElementFileType } from '@/components/pages/chat/BindFile'
import { createEffectorField } from '@/helpers/effector-field'
import { $userId, $activeUser } from '@/App.module'
import socket from '@/api/socket'

export const pageChanged = createEvent<number>()
export const $page = restore(pageChanged, 0)

// эффекты
// инфо чата
export const submitRequestListMessagesFx = attach({
  source: $page,
  effect: ListMessagesFx,
  mapParams: (params: ListChatFxParams, page: number) => {
    return {
      user_id: params.user_id,
      recipient_id: params.recipient_id,
      offset: page,
      limit: 25,
    }
  },
})
export const emitEnterToChatFx = createEffect((chat_id: number) => {
  socket.enterToChat(chat_id)
})
export const changeSidebarMessageFx = createEffect(
  ({
    user,
    recipient,
    message,
  }: {
    user: User
    recipient: User
    message: Message
  }) => {
    changeLastMessage({
      chat_id: message.chat_id,
      last_message: message,
      recipient_info: recipient,
    })
    socket.sendMessage({ user, message, recipient_id: recipient.user_id })
  },
)
export const submitRequestSendMessagesFx = attach({
  effect: SendMessagesFx,
  mapParams: (params: SendMessageFxParams) => {
    const formData = new FormData()
    // @ts-ignore
    formData.append('author', params.author)
    formData.append('message', params.message)
    // @ts-ignore
    formData.append('date', params.date.toUTCString())
    params.files.forEach((file) => {
      // @ts-ignore
      formData.append('file', file)
    })
    // @ts-ignore
    if (params.chat_id) formData.append('chat_id', params.chat_id)
    // @ts-ignore
    if (params.recipient) formData.append('recipient', params.recipient)
    return formData
  },
})

// сторы
export const fetchListMessages = createEvent()
export const fetchMoreMessages = createEvent()
$page.on(fetchListMessages, () => 0)
$page.on(fetchMoreMessages, (state) => state + 1)

export const $canLoadMore = createStore(false)
$canLoadMore.on(
  submitRequestListMessagesFx.doneData,
  (_state, payload) => payload.body.next,
)

export const enterToChat = createEvent<void>()
export const changeChatId = createEvent<number>()
export const $chat_id = restore(changeChatId, -1)
$chat_id.on(
  submitRequestListMessagesFx.doneData,
  (_state, payload) => payload.body.results.chat_id || -1,
)

export const changeRecipientId = createEvent<number>()
export const $recipient_id = restore(changeRecipientId, -1)

export const catchIncommingMessage = createEvent<Message>()
export const changeListMessages = createEvent<Message[]>()
export const $listMessages = restore(changeListMessages, [])
$listMessages.on(submitRequestListMessagesFx.doneData, (state, payload) => [
  ...payload.body.results.messages,
  ...state,
])
$listMessages.on(submitRequestSendMessagesFx.doneData, (state, payload) => [
  ...state,
  payload.body,
])
$listMessages.on(catchIncommingMessage, (state, message) => [...state, message])

export const $triggerClean = createStore(false)
$triggerClean.on(submitRequestSendMessagesFx.doneData, (state) => !state)

// Поле ввода ссобщения
export const sendMessage = createEvent()
export const [$textMessage, textMessageChanged] = createEffectorField({
  defaultValue: '',
})
export const changeListFiles = createEvent<ElementFileType[]>()
export const $listFiles = restore(changeListFiles, [])
//
const $canSendChatRequest = combine(
  $recipient_id,
  submitRequestListMessagesFx.pending,
  (recipient_id, isPending) =>
    typeof recipient_id === 'number' && recipient_id > 0 && !isPending,
)
const $prepareUserChatData = combine({
  user_id: $userId,
  recipient_id: $recipient_id,
})
const $canSendMessageRequest = combine(
  $textMessage,
  $listFiles,
  submitRequestSendMessagesFx.pending,
  (textMessage, listFiles, isPending) =>
    (textMessage.length > 0 || listFiles.length > 0) && !isPending,
)
const $prepareMessageData = combine(
  $textMessage,
  $listFiles,
  $recipient_id,
  $userId,
  $chat_id,
  (textMessage, listFiles, recipient_id, idUser, chat_id) => {
    const data: SendMessageFxParams = {
      author: idUser,
      message: textMessage,
      date: new Date(),
      files: listFiles.map((item) => item.file),
    }
    chat_id < 0 ? (data.recipient = recipient_id) : (data.chat_id = chat_id)
    return data
  }
)
// методы
sample({
  clock: [fetchListMessages, fetchMoreMessages],
  source: guard({ source: $prepareUserChatData, filter: $canSendChatRequest }),
  target: submitRequestListMessagesFx,
})
sample({
  clock: sendMessage,
  source: guard({
    source: $prepareMessageData,
    filter: $canSendMessageRequest,
  }),
  target: submitRequestSendMessagesFx,
})
forward({
  from: submitRequestSendMessagesFx.doneData,
  to: [
    textMessageChanged.prepend(() => ''),
    changeListFiles.prepend(() => []),
    changeChatId.prepend(({ body }) => body.chat_id),
  ],
})
sample({
  clock: submitRequestSendMessagesFx.doneData,
  source: { profile_info: $profileUser, recipient_info: $activeUser },
  fn: (data, payload) => ({
    user: data.profile_info,
    recipient: data.recipient_info,
    message: payload.body,
  }),
  target: changeSidebarMessageFx,
})
sample({
  clock: enterToChat,
  source: $chat_id,
  target: emitEnterToChatFx,
})

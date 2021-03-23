import { createEvent, attach, combine, sample, guard, restore, forward } from 'effector-root'
import { ListChatFxParams, Message, SendMessageFxParams } from '@/api/types'
import { ListMessagesFx, SendMessagesFx } from '@/api/Chat'
import { ElementFileType } from '@/components/pages/chat/BindFile'
import { createEffectorField } from '@/helpers/effector-field'
import { $idUser } from '@/App.module'

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
      recipment_id: params.recipment_id,
      offset: page,
      limit: 25
    }
  }
})
export const submitRequestSendMessagesFx = attach({
  effect: SendMessagesFx,
  mapParams: (params: SendMessageFxParams) => params
})

// сторы
export const fetchListMessages = createEvent()

export const changeChatId = createEvent<number>()
const $chat_id = restore(changeChatId, -1)

export const changeRecipmentId = createEvent<number>()
const $recipment_id = restore(changeRecipmentId, -1)

export const changeListMessages = createEvent<Message[]>()
export const $listMessages = restore(changeListMessages, [])
$listMessages.on(submitRequestListMessagesFx.doneData, (state, payload) => [...payload.body.results.messages, ...state])
$listMessages.on(submitRequestSendMessagesFx.doneData, (state, payload) => [...state, payload.body.message])

export const changeTriggerClean = createEvent<boolean>()
export const $triggerClean = restore(changeTriggerClean, false)

// Поле ввода ссобщения
export const sendMessage = createEvent()
export const [$textMessage, textMessageChanged] = createEffectorField({ defaultValue: '' })
export const changeListFiles = createEvent<ElementFileType[]>()
export const $listFiles = restore(changeListFiles, [])
//

const $canSendChatRequest = combine(
  $recipment_id,
  submitRequestListMessagesFx.pending,
  (recipment_id, isPending) => typeof recipment_id === 'number' && recipment_id > 0 && !isPending
)
const $prepareUserChatData = combine({ user_id: $idUser, recipment_id: $recipment_id })
const $canSendMessageRequest = combine(
  $textMessage,
  $listFiles,
  submitRequestSendMessagesFx.pending,
  (textMessage, listFiles, isPending) => (textMessage.length > 0 || listFiles.length > 0) && !isPending
)
const $prepareMessageData = combine(
  $textMessage,
  $listFiles,
  $recipment_id,
  $idUser,
  $chat_id,
  (textMessage, listFiles, recipment_id, idUser, chat_id) => {
    const data: SendMessageFxParams = {
      author: idUser,
      message: textMessage,
      date: new Date()
    }
    chat_id < 0 ? data.recipient = recipment_id : data.chat_id = chat_id
    return data
  }
)

// методы
sample({
  clock: fetchListMessages,
  source: guard({ source: $prepareUserChatData, filter: $canSendChatRequest }),
  target: submitRequestListMessagesFx
})
forward({
  from: submitRequestListMessagesFx.doneData,
  to: changeChatId.prepend(({ body }) => body.results.chat_id || -1)
})
sample({
  clock: sendMessage,
  source: guard({ source: $prepareMessageData, filter: $canSendMessageRequest }),
  target: submitRequestSendMessagesFx
})
forward({
  from: submitRequestSendMessagesFx.doneData,
  to: [
    textMessageChanged.prepend(() => ''),
    changeListFiles.prepend(() => []),
    changeTriggerClean.prepend(() => false),
    changeChatId.prepend(({ body }) => body.chat_id || -1),
  ]
})

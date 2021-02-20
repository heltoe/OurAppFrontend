import { attach, createEffect, createEvent, sample, guard, combine, forward } from 'effector-root'
import { Response } from '@/api/common/Request'
import { ListMessagesFx } from '@/api/Chat'
import { createEffectorField } from '@/helpers/effector-field'
import { $token } from '@/api/common/AuthorizedRequest'
import { UserId, ListMessagesFxResponse, Message } from '@/api/types'
import { $prepareUserDataId } from '@/App.module'

// эффекты
// инфо сообщений пользователя
export const submitRequestListChatFx = attach({
  effect: ListMessagesFx,
  mapParams: (params: UserId) => params
})
const setListChatFx = createEffect(({ body }: Response<ListMessagesFxResponse>) => {
  listChatChanged(body.messages.map(item => ({ ...item, photo: item.photo || '' })))
})

// события
export const loadListChat = createEvent()
const resetFields = createEvent()

// сторы
export const [$listChat, listChatChanged] = createEffectorField<Message[]>({ defaultValue: [], reset: resetFields })

export const $canSendListChatRequest = combine(
  $token,
  submitRequestListChatFx.pending,
  (token, sendRequestPending) => token.length > 0 && !sendRequestPending
)

// методы
sample({
  clock: loadListChat,
  source: guard({ source: $prepareUserDataId, filter: $canSendListChatRequest }),
  target: submitRequestListChatFx
})
forward({
  from: submitRequestListChatFx.doneData,
  to: setListChatFx
})

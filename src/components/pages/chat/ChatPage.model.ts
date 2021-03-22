import { createEvent, attach, combine, sample, guard, restore } from 'effector-root'
import { ListChatParams } from '@/api/types'
import { ListMessagesFx } from '@/api/Chat'
import { $idUser } from '@/App.module'

export const pageChanged = createEvent<number>()
export const $page = restore(pageChanged, 0)

// эффекты
// инфо чата
export const submitRequestListMessagesFx = attach({
  source: $page,
  effect: ListMessagesFx,
  mapParams: (params: ListChatParams, page: number) => {
    const query = `offset=${page}&limit=25`
    return {
      user_id: params.user_id,
      recipment_id: params.recipment_id,
      offset: page,
      limit: 25
    }
  }
})

// сторы
export const changeRecipmentId = createEvent<number>()
const $recipment_id = restore(changeRecipmentId, -1)

export const changeListMessages = createEvent<any>()
const $listMessages = restore(changeListMessages, [])
$listMessages.on(submitRequestListMessagesFx.doneData, (state, payload) => [...state, ...payload.body.results.map(item => item)])

const $canSendChatRequest = combine(
  $recipment_id,
  submitRequestListMessagesFx.pending,
  (recipment_id, isPending) => typeof recipment_id === 'number' && recipment_id > 0 && !isPending
)
const $prepareUserChatData = combine({ user_id: $idUser, recipment_id: $recipment_id })

// методы
sample({
  clock: changeRecipmentId,
  source: guard({ source: $prepareUserChatData, filter: $canSendChatRequest }),
  target: submitRequestListMessagesFx
})

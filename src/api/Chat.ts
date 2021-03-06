import { createApiEffect } from '@/api/common/CreateApiEffect'
import {
  UserId,
  ListChatFxParams,
  ListMessagesFxResponse,
  Message,
  ListChatsFxResponse
} from '@/api/types'

export const ListMessagesFx = createApiEffect<ListChatFxParams, ListMessagesFxResponse>({
  requestMapper: (params) => ({
    method: 'POST',
    url: `/api/content-chat`,
    body: params
  })
})

export const ListChatsFx = createApiEffect<UserId, ListChatsFxResponse>({
  requestMapper: (params) => ({
    method: 'GET',
    url: `/api/list-chats/${params.user_id}`,
  })
})
export const SendMessagesFx = createApiEffect<any, Message>({
  requestMapper: (params) => ({
    method: 'POST',
    url: `/api/set-message`,
    body: params
  })
})

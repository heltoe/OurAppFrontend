import { createApiEffect } from '@/api/common/CreateApiEffect'
import { UserId, ListChatParams, ListMessagesFxResponse } from '@/api/types'

export const ListMessagesFx = createApiEffect<ListChatParams, ListMessagesFxResponse>({
  requestMapper: (params) => ({
    method: 'POST',
    url: `/api/content-chat`,
    body: params
  })
})

export const ListChatsFx = createApiEffect<UserId, any>({
  requestMapper: (params) => ({
    method: 'GET',
    url: `/api/list-chats/${params.user_id}`,
  })
})
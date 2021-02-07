import { createApiEffect } from '@/api/common/CreateApiEffect'
import { ListFriendsFxResponse, ListUsersFxResponse } from '@/api/types'

export const ListFriendsFx = createApiEffect<void, ListFriendsFxResponse>({
  requestMapper: (params: any) => ({
    method: 'GET',
    url: `/api/user-friends/${params.id}`,
  })
})
export const ListFriendShipFx = createApiEffect<void, ListUsersFxResponse>({
  requestMapper: (params: any) => ({
    method: 'GET',
    url: `/api/user-friendship/${params.id}`,
  })
})

export const ListUsersFx = createApiEffect<void, ListUsersFxResponse>({
  requestMapper: (params: any) => ({
    method: 'GET',
    url: `/api/user-list/${params.id}`,
  })
})

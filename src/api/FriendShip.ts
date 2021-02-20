import { createApiEffect } from '@/api/common/CreateApiEffect'
import { CommonFxParams, ListUsersFxResponse, UserId } from '@/api/types'

export const ListFriendShipFx = createApiEffect<void, ListUsersFxResponse>({
  requestMapper: (params: any) => ({
    method: 'GET',
    url: `/api/list-friendship/${params.user_id}${params.query ? `?${params.query}` : ''}`,
  })
})
export const AddToFriendShipFx = createApiEffect<CommonFxParams, UserId>({
  requestMapper: (params: any) => ({
    method: 'PUT',
    url: '/api/add-to-friendship',
    body: params
  })
})

export const RemoveFromFriendShipFx = createApiEffect<CommonFxParams, UserId>({
  requestMapper: (params: any) => ({
    method: 'DELETE',
    url: '/api/remove-from-friendship',
    body: params
  })
})

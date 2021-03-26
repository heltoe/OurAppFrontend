import { createApiEffect } from '@/api/common/CreateApiEffect'
import {
  CommonFxParams,
  ListUsersFxResponse,
  UserId,
  FriendId,
  CommonGetParams
} from '@/api/types'

export const ListFriendShipFx = createApiEffect<CommonGetParams, ListUsersFxResponse>({
  requestMapper: (params) => ({
    method: 'GET',
    url: `/api/list-friendship/${params.user_id}${params.query ? `?${params.query}` : ''}`,
  })
})
export const AddToFriendShipFx = createApiEffect<CommonFxParams, UserId>({
  requestMapper: (params) => ({
    method: 'PUT',
    url: '/api/add-to-friendship',
    body: params
  })
})

export const RemoveFromFriendShipFx = createApiEffect<FriendId, UserId>({
  requestMapper: (params) => ({
    method: 'DELETE',
    url: '/api/remove-from-friendship',
    body: params
  })
})

import { createApiEffect } from '@/api/common/CreateApiEffect'
import {
  ListFriendsFxResponse,
  ListUsersFxResponse,
  CommonFxParams,
  UserId,
  FriendId,
  CommonGetParams
} from '@/api/types'

export const ListFriendsFx = createApiEffect<CommonGetParams, ListFriendsFxResponse>({
  requestMapper: (params) => ({
    method: 'GET',
    url: `/api/user-friends/${params.user_id}${params.query ? `?${params.query}` : ''}`
  })
})
export const AddToFriendsFx = createApiEffect<CommonFxParams, UserId>({
  requestMapper: (params) => ({
    method: 'PUT',
    url: '/api/add-to-friend',
    body: params
  })
})
export const RemoveFromFriendsFx = createApiEffect<FriendId, UserId>({
  requestMapper: (params) => ({
    method: 'DELETE',
    url: '/api/remove-from-friend',
    body: params
  })
})
export const ListUsersFx = createApiEffect<CommonGetParams, ListUsersFxResponse>({
  requestMapper: (params) => ({
    method: 'GET',
    url: `/api/user-list/${params.user_id}${params.query ? `?${params.query}` : ''}`,
  })
})

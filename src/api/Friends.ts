import { createApiEffect } from '@/api/common/CreateApiEffect'
import { ListFriendsFxResponse, ListUsersFxResponse, CommonFxParams, CommonResponse } from '@/api/types'

export const ListFriendsFx = createApiEffect<void, ListFriendsFxResponse>({
  requestMapper: (params: any) => ({
    method: 'GET',
    url: `/api/user-friends/${params.userId}`
  })
})
export const AddToFriendsFx = createApiEffect<CommonFxParams, CommonResponse>({
  requestMapper: (params: any) => ({
    method: 'PUT',
    url: '/api/add-to-friend',
    body: params
  })
})
export const RemoveFromFriendsFx = createApiEffect<CommonFxParams, CommonResponse>({
  requestMapper: (params: any) => ({
    method: 'DELETE',
    url: '/api/remove-from-friend',
    body: params
  })
})
export const ListUsersFx = createApiEffect<void, ListUsersFxResponse>({
  requestMapper: (params: any) => ({
    method: 'GET',
    url: `/api/user-list/${params.userId}`,
  })
})

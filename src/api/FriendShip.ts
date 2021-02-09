import { createApiEffect } from '@/api/common/CreateApiEffect'
import { CommonFxParams, ListUsersFxResponse, CommonResponse } from '@/api/types'

export const ListFriendShipFx = createApiEffect<void, ListUsersFxResponse>({
  requestMapper: (params: any) => ({
    method: 'GET',
    url: `/api/list-friendship/${params.userId}`,
  })
})
export const AddToFriendShipFx = createApiEffect<CommonFxParams, CommonResponse>({
  requestMapper: (params: any) => ({
    method: 'PUT',
    url: '/api/add-to-friendship',
    body: params
  })
})

export const RemoveToFriendShipFx = createApiEffect<CommonFxParams, CommonResponse>({
  requestMapper: (params: any) => ({
    method: 'DELETE',
    url: '/api/remove-from-friendship',
    body: params
  })
})
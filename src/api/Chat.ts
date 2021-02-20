import { createApiEffect } from '@/api/common/CreateApiEffect'
import { UserId, ListMessagesFxResponse } from '@/api/types'

export const ListMessagesFx = createApiEffect<UserId, ListMessagesFxResponse>({
  requestMapper: (params: any) => ({
    method: 'GET',
    url: `/api/list-chat/${params.user_id}`
  })
})

// export const PersonalInfoFx = createApiEffect<PersonalInfoFxParams, ProfileFxResponse>({
//   requestMapper: (params: any) => ({
//     method: 'POST',
//     url: '/api/personal-info',
//     body: params
//   })
// })
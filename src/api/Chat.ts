import { createApiEffect } from '@/api/common/CreateApiEffect'
import { ProfileFxParams, ListMessagesFxResponse } from '@/api/types'

export const ListMessagesFx = createApiEffect<ProfileFxParams, ListMessagesFxResponse>({
  requestMapper: (params: any) => ({
    method: 'GET',
    url: `/api/list-chat/${params.id}`
  })
})

// export const PersonalInfoFx = createApiEffect<PersonalInfoFxParams, ProfileFxResponse>({
//   requestMapper: (params: any) => ({
//     method: 'POST',
//     url: '/api/personal-info',
//     body: params
//   })
// })
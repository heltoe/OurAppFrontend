import { createApiEffect } from '@/api/common/CreateApiEffect'
import { LoginFxParams, LoginFxResponse } from '@/api/types'

export const LoginFx = createApiEffect<LoginFxParams, LoginFxResponse>({
  requestMapper: (params: any) => ({
    method: 'POST',
    url: '/entry/register/',
    body: params
  })
})

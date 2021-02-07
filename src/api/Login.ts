import { createApiEffect } from '@/api/common/CreateApiEffect'
import { LoginFxParams, IntroFxResponse } from '@/api/types'

export const LoginFx = createApiEffect<LoginFxParams, IntroFxResponse>({
  requestMapper: (params: any) => ({
    method: 'POST',
    url: '/api/login',
    body: params
  })
})

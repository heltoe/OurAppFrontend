import { createApiEffect } from '@/api/common/CreateApiEffect'
import { RegistrationFxParams, RegistrationFxResponse } from '@/api/types'

export const RegistrationFx = createApiEffect<RegistrationFxParams, RegistrationFxResponse>({
  requestMapper: (params: any) => ({
    method: 'POST',
    url: '/entry/register/',
    body: params
  })
})

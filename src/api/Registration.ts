import { createApiEffect } from '@/api/common/CreateApiEffect'
import { RegistrationFxParams, IntroFxResponse } from '@/api/types'

export const RegistrationFx = createApiEffect<RegistrationFxParams, IntroFxResponse>({
  requestMapper: (params) => ({
    method: 'POST',
    url: '/api/registration',
    body: params
  })
})

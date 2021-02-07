import { createApiEffect } from '@/api/common/CreateApiEffect'
import { RestorePasswordFxParams } from '@/api/types'

export const RestoreFx = createApiEffect<RestorePasswordFxParams, void>({
  requestMapper: (params: any) => ({
    method: 'POST',
    url: '/api/reset-password',
    body: params
  })
})

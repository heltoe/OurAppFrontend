import { createApiEffect } from '@/api/common/CreateApiEffect'
import { RestorePasswordFxParams } from '@/api/types'

export const RestoreFx = createApiEffect<RestorePasswordFxParams, { status: string }>({
  requestMapper: (params) => ({
    method: 'POST',
    url: '/api/reset-password',
    body: params
  })
})

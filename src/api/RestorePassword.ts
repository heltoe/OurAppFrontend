import { createApiEffect } from '@/api/common/CreateApiEffect'
import { RestorePasswordFxParams, RestorePasswordFxResponse } from '@/api/types'

export const RestoreFx = createApiEffect<RestorePasswordFxParams, RestorePasswordFxResponse>({
  requestMapper: (params: any) => ({
    method: 'POST',
    url: '/entry/register/',
    body: params
  })
})

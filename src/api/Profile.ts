import { createApiEffect } from '@/api/common/CreateApiEffect'
import {
  PersonalInfoFxParams,
  ProfileFxResponse,
  RemoveAccountFxParams,
  RemoveAccountFxResponse
} from '@/api/types'

export const ProfileFx = createApiEffect<void, ProfileFxResponse>({
  requestMapper: (params: any) => ({
    method: 'GET',
    url: `/api/user-data/${params.idUser}`
  })
})

export const PersonalInfoFx = createApiEffect<PersonalInfoFxParams, ProfileFxResponse>({
  requestMapper: (params: any) => ({
    method: 'POST',
    url: '/api/personal-info',
    body: params
  })
})

export const RemoveAccountFx = createApiEffect<RemoveAccountFxParams, RemoveAccountFxResponse>({
  requestMapper: (params: any) => ({
    method: 'POST',
    url: '/api/remove-account',
    body: params
  })
})

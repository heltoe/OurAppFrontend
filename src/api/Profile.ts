import { createApiEffect } from '@/api/common/CreateApiEffect'
import { PersonalInfoFxParams, User, Profile } from '@/api/types'

export const ProfileFx = createApiEffect<void, User>({
  requestMapper: (params: any) => ({
    method: 'GET',
    url: `/api/user-data/${params.id_user}`
  })
})

export const PersonalInfoFx = createApiEffect<PersonalInfoFxParams, Profile>({
  requestMapper: (params) => ({
    method: 'POST',
    url: '/api/personal-info',
    body: params
  })
})

export const UpdatePersonalInfoFx = createApiEffect<PersonalInfoFxParams, Profile>({
  requestMapper: (params) => ({
    method: 'PUT',
    url: '/api/update-user-data',
    body: params
  })
})
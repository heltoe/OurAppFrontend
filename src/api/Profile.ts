import { createApiEffect } from '@/api/common/CreateApiEffect'
import {
  PersonalInfoFxParams,
  User,
  Profile,
  ChangePasswordFxParams,
  CommonStatusAnswer,
  UpdatePersonalInfoParams,
  AvatarFxParams,
  AvatarFxResponse
} from '@/api/types'

export const ProfileFx = createApiEffect<{ user_id: number }, User>({
  requestMapper: (params) => ({
    method: 'GET',
    url: `/api/user-data/${params.user_id}`
  })
})

export const PersonalInfoFx = createApiEffect<PersonalInfoFxParams, Profile>({
  requestMapper: (params) => ({
    method: 'POST',
    url: '/api/personal-info',
    body: params
  })
})

export const UpdatePersonalInfoFx = createApiEffect<UpdatePersonalInfoParams, Profile>({
  requestMapper: (params) => ({
    method: 'PUT',
    url: '/api/update-user-data',
    body: params
  })
})

export const ChangePasswordFx = createApiEffect<ChangePasswordFxParams, CommonStatusAnswer>({
  requestMapper: (params) => ({
    method: 'PUT',
    url: '/api/change-password',
    body: params
  })
})

export const ChangeAvatarFx = createApiEffect<FormData, AvatarFxResponse>({
  requestMapper: (params) => ({
    method: 'PUT',
    url: '/api/change-avatar',
    body: params
  })
})
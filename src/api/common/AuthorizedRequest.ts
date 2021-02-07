import { attach, createEffect, createEvent, Effect, restore, split, Store, forward } from 'effector-root'
import Cookies from 'js-cookie'
import { request, RequestParams, Response } from '@/api/common/Request'
import { navigatePush } from '@/helpers/navigation'
import { getRouterByName } from '@/routes'
import { config } from '@/config'

export const setTokenForRequest = createEvent<string>()
export const $token = restore(setTokenForRequest, '')
export const setRefreshTokenForRequest = createEvent<string>()
export const $refreshToken = restore(setRefreshTokenForRequest, '')
export const logout = createEvent()

setTokenForRequest.watch((token) => {
  if (token || token === '') {
    Cookies.set(config.TOKEN, token)
  } else {
    Cookies.get(config.TOKEN)
  }
})
setRefreshTokenForRequest.watch((token) => {
  if (token || token === '') {
    Cookies.set(config.REFRESH_TOKEN, token)
  } else {
    Cookies.get(config.REFRESH_TOKEN)
  }
})

export const requestFx = createEffect<RequestParams, Response, Response>({ handler: request })
export const logoutFx = createEffect((data: any) => {
  setTokenForRequest('')
  navigatePush({ pathname: getRouterByName('login-page').path })
})

export const authorizedRequestFx = attach<
  RequestParams,
  Store<string>,
  Effect<RequestParams, Response, Response>
>({
  effect: requestFx,
  source: $token,
  mapParams: (params, token) => {
    const auth = token ? { Authorization: `Bearer ${token}` } : null
    return { ...params, headers: { ...params.headers, ...auth } }
  },
})

split({
  source: authorizedRequestFx.failData,
  match: {
    unauthorized: ({ status }) => status === 401,
  },
  cases: {
    unauthorized: logoutFx,
  },
})
forward({
  from: logout,
  to: logoutFx
})

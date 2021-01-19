import { attach, createEffect, createEvent, Effect, restore, split, Store } from 'effector-root'
import Cookies from 'js-cookie'
import { request, RequestParams, Response } from '@/api/common/Request'
import { config } from '@/config'

export const setTokenForRequest = createEvent<string>()
export const $token = restore(setTokenForRequest, '')

setTokenForRequest.watch((token) => {
  if (token || token === '') {
    Cookies.set(config.TOKEN, token)
  } else {
    Cookies.get(config.TOKEN)
  }
})

export const requestFx = createEffect<RequestParams, Response, Response>({ handler: request })

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

// split({
//   source: authorizedRequestFx.failData,
//   match: {
//     unauthorized: ({ status }) => status === 401,
//   },
//   cases: {
//     unauthorized: navigatePush.prepend<Response>(() => ({ name: 'auth.login' })),
//   },
// })
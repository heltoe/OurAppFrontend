import { authorizedRequestFx } from '@/api/common/AuthorizedRequest'
import { RequestParams, Response } from '@/api/common/Request'
import { attach, Effect } from 'effector-root'

type Options<PARAMS, DONE, FAIL> = {
  requestMapper: (params: PARAMS) => RequestParams
}

type ApiEffect<PARAMS, DONE, FAIL> = Effect<PARAMS, Response<DONE>, Response<FAIL>>

export const createApiEffect = <PARAMS = void, DONE = void, FAIL = void>(
  options: Options<PARAMS, DONE, FAIL>
): ApiEffect<PARAMS, DONE, FAIL> =>
  attach<PARAMS, ApiEffect<RequestParams, DONE, FAIL>>({
    effect: authorizedRequestFx,
    mapParams: options.requestMapper,
  })
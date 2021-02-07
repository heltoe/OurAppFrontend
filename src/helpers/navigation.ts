import { createEvent } from 'effector-root'
import { history } from '@/routes'

type Params = {
  pathname: string
  search?: string
  state?: string
}

export const navigatePush = createEvent<Params>()
export const navigateReplace = createEvent<Params>()

const navigateFactory = (navigationMethod: 'push' | 'replace') => (navigate: Params) => {
  history[navigationMethod](navigate)
}

navigatePush.watch(navigateFactory('push'))
navigateReplace.watch(navigateFactory('replace'))

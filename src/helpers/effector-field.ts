import { createEvent, restore, Event, Store } from 'effector-root'

type OptionsField<T> = {
  defaultValue: T
  reset?: Event<any>
}

export const createEffectorField = <T>(options: OptionsField<T>): [Store<T>, Event<T>] => {
  const changeEvent = createEvent<T>()
  const $store = restore(changeEvent, options.defaultValue)
  if (options.reset) $store.reset(options.reset)
  return [$store, changeEvent]
}

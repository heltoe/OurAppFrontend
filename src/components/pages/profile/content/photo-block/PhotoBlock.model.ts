import { createEvent, restore } from 'effector-root'

export const photoChanged = createEvent<string>()
export const $photo = restore(photoChanged, '')

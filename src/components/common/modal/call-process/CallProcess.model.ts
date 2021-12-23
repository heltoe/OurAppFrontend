import { createEvent, restore } from 'effector'

export const changeIsVideo = createEvent<boolean>()
export const $isVideo = restore(changeIsVideo, true)

export const changeIsAudio = createEvent<boolean>()
export const $isAudio = restore(changeIsAudio, true)

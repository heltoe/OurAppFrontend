import { createEvent, restore } from 'effector'

export const changeIsVideo = createEvent<boolean>()
export const $isVideo = restore(changeIsVideo, true)

export const changeIsAudio = createEvent<boolean>()
export const $isAudio = restore(changeIsAudio, true)
// состояние аудио/видео собеседника
export const changeIsVideoRecipient = createEvent<boolean>()
export const $isVideoRecipient = restore(changeIsVideoRecipient, true)

export const changeIsAudioRecipient = createEvent<boolean>()
export const $isAudioRecipient = restore(changeIsAudioRecipient, true)

import { createEvent, restore } from 'effector'

export const changeIsShowCommonModal = createEvent<boolean>()
export const $isShowCommonModal = restore(changeIsShowCommonModal, false)

export const changeIsShowOfferModal = createEvent<boolean>()
export const $isShowOfferModal = restore(changeIsShowOfferModal, false)

export const changeIsShowProcessModal = createEvent<boolean>()
export const $isShowProcessModal = restore(changeIsShowProcessModal, false)

export const changeStream = createEvent<MediaStream>()
export const $stream = restore(changeStream, null)

export const changeUserStream = createEvent<MediaStream>()
export const $userStream = restore(changeUserStream, null)

export const changeUserSignal = createEvent<any>()
export const $userSignal = restore(changeUserSignal, null)

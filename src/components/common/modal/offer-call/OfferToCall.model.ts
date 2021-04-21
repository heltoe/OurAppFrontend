import { createEvent, restore } from 'effector';

export const changeTypeCall = createEvent<'incomming' | 'outgoing'>()
export const $typeCall = restore(changeTypeCall, 'incomming')

export const changeIsShowModal = createEvent<boolean>()
export const $isShowModal = restore(changeIsShowModal, false)

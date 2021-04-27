import { createEvent, restore } from 'effector';

export const changeIsShowModal = createEvent<boolean>()
export const $isShowModal = restore(changeIsShowModal, false)

import { createEvent, createStore, restore } from 'effector'
import { User } from '@/api/types'

export const cleanParticipants = createEvent()
export const changeParticipantCall = createEvent<User>()
export const $participantsCall = createStore<User[]>([]).reset(cleanParticipants)
$participantsCall.on(changeParticipantCall, (state, payload) => {
    const element = state.find(item => item.user_id === payload.user_id)
    return element ? state.filter(item => item.user_id !== element.user_id) : [...state, payload]
})

export const changeSettingsToCall = createEvent<{ id: number, type: 'offer' | 'answer', signal: any } | null>()
export const $settingsToCall = restore(changeSettingsToCall, null)

export const changePeerSignal = createEvent<any>()
export const $peerSignal = restore(changePeerSignal, null)

export const changeIsVideo = createEvent<boolean>()
export const $isVideo = restore(changeIsVideo, true)

export const changeIsAudio = createEvent<boolean>()
export const $isAudio = restore(changeIsAudio, true)

export const changeIsShowModal = createEvent<boolean>()
export const $isShowModal = restore(changeIsShowModal, false)

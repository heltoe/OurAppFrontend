import { useCallback, useEffect, useRef } from 'react'
import { useStore } from 'effector-react'
import { $profileUser } from '@/components/pages/profile/EditProfile.model'
import { $callUser, addParticipantCall } from '@/App.module'
import {
  $recipientCallUser,
  $sendlerCallUser,
} from '@/App.module'
// @ts-ignore
import freeice from 'freeice'
import socket, { CallUserInfo } from '@/api/socket'

export const PARTICIPANT_CALL = 'PARTICIPANT_CALL_'

// const useStateWithCallback = (initialState: any) => {
//   const [state, setState] = useState(initialState)
//   const cbRef = useRef(null)

//   const updateState = useCallback((newState, cb) => {
//     cbRef.current = cb
//     setState((prev: any) =>
//       typeof newState === 'function' ? newState(prev) : newState,
//     )
//   }, [])

//   useEffect(() => {
//     if (cbRef.current) {
//       // @ts-ignore
//       cbRef.current(state)
//       // @ts-ignore
//       cbRef.current(null)
//     }
//   }, [state])

//   return [state, updateState]
// }

export default () => {
  const userInfo = useStore($profileUser)
  const sendlerCallUser = useStore($sendlerCallUser)
  const recipientCallUser = useStore($recipientCallUser)
  const recipientInfo = userInfo.user_id === sendlerCallUser.user_id ? recipientCallUser : sendlerCallUser

  const peerConnections = useRef<any>({})
  const localMediaStream = useRef<any>(null)
  const peerMediaElements = useRef<any>({})
  // получения данных с камеры и мирофона и добавление трансляции на экран
  const startCapture = async () => {
    if (userInfo) {
      try {
        localMediaStream.current = await (<any>(
          navigator.mediaDevices
        )).getUserMedia({
          audio: true,
          video: {
            mandatory: {
              minWidth: 640,
              maxWidth: 640,
              minHeight: 480,
              maxHeight: 480,
              minFrameRate: 30,
            },
          },
        })
        const userData = {
          user_id: userInfo.user_id,
          full_name: `${userInfo.first_name} ${userInfo.last_name}`,
        }
        addParticipantCall(userData)
        const localVideoElement = peerMediaElements.current[`${PARTICIPANT_CALL}${userData.user_id}`]
        if (localVideoElement) {
          localVideoElement.volume = 0
          localVideoElement.srcObject = localMediaStream.current
        }
        peerConnections.current[userData.user_id] = new RTCPeerConnection({
          iceServers: freeice(),
        })
      } catch (e) {
        console.error('Error getting UserMedia', e)
      }
    }
  }
  // завершения звонка
  const leaveFromCall = () => {
    const localStream = localMediaStream.current
    if (localStream) {
      (<any> localStream).getTracks().forEach((track: any) => track.stop())
      if (userInfo && recipientInfo) {
        socket.leaveFromCall({
          user_info: {
            user_id: userInfo.user_id,
            full_name: `${userInfo.first_name} ${userInfo.last_name}`,
          },
          recipient_info: {
            user_id: recipientInfo.user_id,
            full_name: `${recipientInfo.first_name} ${recipientInfo.last_name}`,
          },
        })
      }
    }
  }
  // создаем RTC peer connection
  const createRTCPeerConnection = () => {
    const recipientData = {
      user_id: userInfo.user_id,
      full_name: `${userInfo.first_name} ${userInfo.last_name}`,
    }
    peerConnections.current[`${PARTICIPANT_CALL}${recipientData.user_id}`].onicecandidate = (event: any) => {
      if (event.candidate) {
        socket.relayIceCandidate({
          recipient_id: recipientInfo.user_id,
          user_info: recipientData,
          iceCandidate: event.candidate,
        })
      }
    }
    peerConnections.current[`${PARTICIPANT_CALL}${recipientData.user_id}`].ontrack = ({ streams: [remoteStream] }) => {
      addParticipantCall(recipientData)
      peerMediaElements.current[`${PARTICIPANT_CALL}${recipientData.user_id}`].srcObject = remoteStream
    }
    localMediaStream.current.getTracks().forEach((track: any) => {
      peerConnections.current[`${PARTICIPANT_CALL}${recipientData.user_id}`].addTrack(track, localMediaStream.current)
    });
  }

  const createOfferSDP = async () => {
    const offerSDP = await peerConnections.current[`${PARTICIPANT_CALL}${userInfo.user_id}`].createOffer()
    await peerConnections.current[`${PARTICIPANT_CALL}${userInfo.user_id}`].setLocalDescription(offerSDP)
    socket.sendOfferSDP({ recipient_id: recipientInfo.user_id, sessionDescription: offerSDP })
  }

  const setDescriptionAndCreateAnswer = async ({ user_id, sessionDescription }) => {
    await peerConnections.current[`${PARTICIPANT_CALL}${user_id}`].setRemoteDescription(
      new RTCSessionDescription(sessionDescription)
    )
    if (sessionDescription.type === 'offer') {
      const answerSDP = await peerConnections.current[`${PARTICIPANT_CALL}${userInfo.user_id}`].createAnswer()
      await peerConnections.current[`${PARTICIPANT_CALL}${userInfo.user_id}`].setLocalDescription(answerSDP)
      socket.sendOfferSDP({ recipient_id: recipientInfo.user_id, sessionDescription: answerSDP })
    }
  }

  const catchIceCandidate = ({ user_id, iceCandidate }) => {
    peerConnections.current[`${PARTICIPANT_CALL}${user_id}`].addIceCandidate(
      new RTCIceCandidate(iceCandidate)
    )
  }

  const startCall = () => {
    if (userInfo) peerMediaElements.current[`${PARTICIPANT_CALL}${userInfo.user_id}`] = null
    startCapture()
  }
  const stopCall = () => {
    leaveFromCall()
  }
  // запись ссылок на video тэг
  const provideMediaRef = useCallback((id: number, node: HTMLVideoElement) => {
    const arrMediaElements = peerMediaElements.current
    if (arrMediaElements) arrMediaElements[`${PARTICIPANT_CALL}${id}`] = node
  }, [])

  return { provideMediaRef }
}

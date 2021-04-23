import { useCallback, useEffect, useRef } from 'react'
import { useStore } from 'effector-react'
import { $profileUser } from '@/components/pages/profile/EditProfile.model'
import { $callUser, addParticipantCall } from '@/App.module'
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
  const recipientInfo = useStore($callUser)

  const peerConnections = useRef<any>({})
  const localMediaStream = useRef<any>(null)
  const peerMediaElements = useRef<any>({})
  // получения данных с камеры и мирофона и добавление трансляции на экран
  const startCapture = async () => {
    if (userInfo && recipientInfo) {
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
        socket.joinToCall({
          user_id: userData.user_id,
          recipient_id: recipientInfo.user_id,
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
  // const createRTCPeerConnection = () => {
  //   peerConnections.current[userInfo.user_id] = new RTCPeerConnection({
  //     iceServers: freeice(),
  //   })
  // }
  // // создаем запрос на соединение
  // const createOfferSDP = async () => {
  //   const profileData = {
  //     user_id: userInfo.user_id,
  //     full_name: `${userInfo.first_name} ${userInfo.last_name}`,
  //   }
  //   const offerSDP = peerConnections.current[profileData.user_id].createOffer()
  //   await peerConnections.current[profileData.user_id].setLocalDescription(
  //     offerSDP,
  //   )
  //   socket.relaySDP({
  //     user_info: profileData,
  //     sessionDescription: offerSDP,
  //   })
  // }
  // // создаем ответ для соединения
  // const createAnswerSDP = async (offer: any) => {
  //   const profileData = {
  //     user_id: userInfo.user_id,
  //     full_name: `${userInfo.first_name} ${userInfo.last_name}`,
  //   }
  //   peerConnections.current[userInfo.user_id].setRemoteDescription(offer)
  //   // TODO добавить клиента себе
  //   const answerSDP = peerConnections.current[userInfo.user_id].createAnswer()
  //   await peerConnections.current[userInfo.user_id].setLocalDescription(
  //     answerSDP,
  //   )
  //   socket.relaySDP({
  //     user_info: profileData,
  //     sessionDescription: answerSDP,
  //   })
  //   // peerConnections.current[userInfo.user_id].setRemoteDescription(offer)
  // }
  // создаем кандидата на ice connect
  // const createIceCandidate = () => {
  //   const profileData = {
  //     user_id: userInfo.user_id,
  //     full_name: `${userInfo.first_name} ${userInfo.last_name}`,
  //   }
  //   peerConnections.current[profileData.user_id].onicecandidate = (event: any) => {
  //     if (event.candidate) {
  //       socket.relayIceCandidate({
  //         user_info: profileData,
  //         iceCandidate: event.candidate,
  //       })
  //     }
  //   }
  // }

  // процесс добавления участника к звонку
  const handler
  // запись ссылок на video тэг
  const provideMediaRef = useCallback((id: number, node: HTMLVideoElement) => {
    const arrMediaElements = peerMediaElements.current
    if (arrMediaElements) arrMediaElements[`${PARTICIPANT_CALL}${id}`] = node
  }, [])
  // хук для начала звонка и выхода из него
  useEffect(() => {
    if (userInfo) peerMediaElements.current[`${PARTICIPANT_CALL}${userInfo.user_id}`] = null
    // createRTCPeerConnection()
    startCapture()
    return () => {
      leaveFromCall()
    }
  }, [])

  // // хук для добавления участников к звонку
  // useEffect(() => {
  //   socket.addPeer(handlerNewPeer)
  // }, [])

  return { provideMediaRef }
}

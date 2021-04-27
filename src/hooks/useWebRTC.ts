import { useCallback, useEffect, useRef } from 'react'
import { useStore } from 'effector-react'
import { $profileUser } from '@/components/pages/profile/EditProfile.model'
import {
  addParticipantCall,
  $recipientCallUser,
  $sendlerCallUser,
} from '@/App.module'
// @ts-ignore
import freeice from 'freeice'
import socket from '@/api/socket'
import { User } from '@/api/types'

export const PARTICIPANT_CALL = 'PARTICIPANT_CALL_'

export default () => {
  const userInfo = useStore($profileUser)
  const sendlerCallUser = useStore($sendlerCallUser)
  const recipientCallUser = useStore($recipientCallUser)
  const recipientInfo =
    userInfo.user_id === sendlerCallUser?.user_id
      ? (recipientCallUser as User)
      : (sendlerCallUser as User)

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
        const localVideoElement =
          peerMediaElements.current[`${PARTICIPANT_CALL}${userData.user_id}`]
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
    if (recipientInfo) socket.leaveFromCall(recipientInfo.user_id)
    if (localStream) {
      (<any> localStream).getTracks().forEach((track: any) => track.stop())
    }
  }

  const createOfferSDP = async () => {
    const offerSDP = await peerConnections.current[
      `${PARTICIPANT_CALL}${userInfo.user_id}`
    ].createOffer()

    await peerConnections.current[
      `${PARTICIPANT_CALL}${userInfo.user_id}`
    ].setLocalDescription(offerSDP)

    socket.sendOfferSDP({
      recipient_id: recipientInfo.user_id,
      sessionDescription: offerSDP,
    })
  }

  const setDescriptionAndCreateAnswer = async (data: {
    user_id: number
    sessionDescription: any
  }) => {
    await peerConnections.current[
      `${PARTICIPANT_CALL}${data.user_id}`
    ].setRemoteDescription(new RTCSessionDescription(data.sessionDescription))
    if (data.sessionDescription.type === 'offer') {
      const answerSDP = await peerConnections.current[
        `${PARTICIPANT_CALL}${userInfo.user_id}`
      ].createAnswer()
      await peerConnections.current[
        `${PARTICIPANT_CALL}${userInfo.user_id}`
      ].setLocalDescription(answerSDP)
      socket.sendOfferSDP({
        recipient_id: recipientInfo.user_id,
        sessionDescription: answerSDP,
      })
    }
  }

  const addIceCandidate = () => {
    peerConnections.current[
      `${PARTICIPANT_CALL}${userInfo.user_id}`
    ].onicecandidate = (event: any) => {
      if (event.candidate) {
        socket.sendIceCandidate({
          recipient_id: recipientInfo.user_id,
          iceCandidate: event.candidate,
        })
      }
    }
    peerConnections.current[
      `${PARTICIPANT_CALL}${recipientInfo.user_id}`
    // @ts-ignore
    ].ontrack = ({ streams: [remoteStream] }) => {
      addParticipantCall({
        user_id: recipientInfo.user_id,
        full_name: `${recipientInfo.first_name} ${recipientInfo.last_name}`,
      })
      peerMediaElements.current[
        `${PARTICIPANT_CALL}${recipientInfo.user_id}`
      ].srcObject = remoteStream
    }
    localMediaStream.current.getTracks().forEach((track: any) => {
      peerConnections.current[
        `${PARTICIPANT_CALL}${recipientInfo.user_id}`
      ].addTrack(track, localMediaStream.current)
    })
  }

  const catchIceCandidate = (data: { user_id: number, iceCandidate: any }) => {
    peerConnections.current[
      `${PARTICIPANT_CALL}${data.user_id}`
    ].addIceCandidate(new RTCIceCandidate(data.iceCandidate))
  }

  useEffect(() => {
    if (userInfo)
      peerMediaElements.current[`${PARTICIPANT_CALL}${userInfo.user_id}`] = null
    startCapture()
  }, [])

  // запись ссылок на video тэг
  const provideMediaRef = useCallback((id: number, node: HTMLVideoElement) => {
    const arrMediaElements = peerMediaElements.current
    if (arrMediaElements) arrMediaElements[`${PARTICIPANT_CALL}${id}`] = node
  }, [])

  return { provideMediaRef, leaveFromCall }
}

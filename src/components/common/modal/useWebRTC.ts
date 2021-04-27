import { useEffect, useRef } from 'react'
import { useStore } from 'effector-react'
import {
  changeIsShowModal,
  cleanParticipants
} from '@/components/common/modal/call-process/CallProcess.model'
import { $recipientCallUser, $sendlerCallUser, $userId } from '@/App.module'

import Peer from 'simple-peer'
import socket from '@/api/socket'

export const PARTICIPANT_CALL = 'PARTICIPANT_CALL_'

export default () => {
  const userId = useStore($userId)
  const sendlerCallUser = useStore($sendlerCallUser)
  const recipientCallUser = useStore($recipientCallUser)

  const localMediaStream = useRef<any>(null)
  const connectionRef = useRef<any>({})
  const peerMediaElements = useRef<any>({})
  
  const provideMediaRef = (id: number, node: HTMLVideoElement) => {
    peerMediaElements.current[`${PARTICIPANT_CALL}${id}`] = node
    if (id === userId) startCapture()
  }

  const startCapture = async() => {
    try {
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          // @ts-ignore
          mandatory: {
            minWidth: 640,
            maxWidth: 640,
            minHeight: 480,
            maxHeight: 480,
            minFrameRate: 30,
          },
        },
      })
      peerMediaElements.current[`${PARTICIPANT_CALL}${userId}`].srcObject = localMediaStream.current
      if (userId === sendlerCallUser!.user_id) handlerPeer({ id: recipientCallUser!.user_id, type: 'offer', signal: localMediaStream.current })
    } catch (e) {
      console.log(e)
    }
  }

  const leaveFromCall = () => {
    connectionRef.current.destroy()
    localMediaStream.current.getTracks().forEach((track: any) => track.stop())
    socket.sendLeaveFromCall({
      to: userId === sendlerCallUser!.user_id ? recipientCallUser!.user_id : sendlerCallUser!.user_id,
      from: userId === sendlerCallUser!.user_id ? sendlerCallUser! : recipientCallUser!
    })
    cleanParticipants()
    changeIsShowModal(false)
  }

  const handlerPeer = ({ id, type, signal}: { id: number, type: 'offer' | 'answer', signal: any }) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: localMediaStream.current
    })
    peer.on('signal', (data: any) => {
      const currentMethod = type === 'offer' ? 'sendOfferSDP' : 'sendAnswerSDP'
      socket[currentMethod]({ to: id, signal: data })
    })
    peer.on('stream', (currentStream: any) => {
      if (peerMediaElements.current[`${PARTICIPANT_CALL}${id}`]) peerMediaElements.current[`${PARTICIPANT_CALL}${id}`].srcObject = currentStream
    })
    if (type === 'offer') peer.signal(signal)
    connectionRef.current = peer
  }

  const peerSignal = (signal: any) => {
    connectionRef.current.signal(signal)
  }

  return { provideMediaRef, startCapture, leaveFromCall, peerSignal, handlerPeer }
}

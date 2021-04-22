import { useCallback, useEffect, useRef, useState } from 'react'
// @ts-ignore
import freeice from 'freeice'
import socket from '@/api/socket'

export const LOCAL_VIDEO = 'LOCAL_VIDEO'

const useStateWithCallback = (initialState: any) => {
  const [state, setState] = useState(initialState)
  const cbRef = useRef(null)

  const updateState = useCallback((newState, cb) => {
    cbRef.current = cb
    setState((prev: any) => typeof newState === 'function' ? newState(prev) : newState)
  }, [])

  useEffect(() => {
    if (cbRef.current) {
      // @ts-ignore
      cbRef.current(state)
      // @ts-ignore
      cbRef.current(null)
    }
  }, [state])

  return [state, updateState]
}

export default () => {
  const [clients, updateClients] = useStateWithCallback([])

  const addNewClient = useCallback((newClient: string, cb) => {
    if (!clients.includes(newClient)) updateClients((list: string[]) => [...list, newClient], cb)
  }, [clients, updateClients])

  const peerConnections = useRef({})
  const localMediaStream = useRef(null)
  const peerMediaElements = useRef({
    [LOCAL_VIDEO]: null
  })

  const startCapture = async () => {
    try {
      localMediaStream.current = await (<any> navigator.mediaDevices).getUserMedia({
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
      addNewClient(LOCAL_VIDEO, () => {
        const localVideoElement = peerMediaElements.current[LOCAL_VIDEO] as HTMLVideoElement | null
        if (localVideoElement) {
          localVideoElement.volume = 0
          localVideoElement.srcObject = localMediaStream.current
        }
      })
      socket.joinToCall()
    } catch(e) {
      console.error('Error getting UserMedia', e)
    }
  }

  const handleNewPeer = async ({ peerId, createOffer }) => {
    if (peerId in peerConnections.current) return console.log(`Already connected to peer ${peerId}`)
    const localPeerConnections = peerConnections.current as any | null
    if (localPeerConnections) {
      peerConnections.current[peerId] = new RTCPeerConnection({
        iceServers: freeice(),
      })
      peerConnections.current[peerId].onicecandidate = (event: any) => {
        if (event.candidate) socket.relayIceCandidate({ peerId, iceCandidate: event.candidate })
      }
      peerConnections.current[peerId].ontrack = ({ streams: [remoteStream] }) => {
        addNewClient(peerId, () => {
          peerMediaElements.current[peerId].srcObject = remoteStream
        })
      }
      const localStream = localMediaStream.current
      if (localStream) {
        localStream.getTracks().forEach((track: any) => {
          peerConnections.current[peerId].addTrack(track, localStream)
        })
      }

      if (createOffer) {
        const offer = await peerConnections.current[peerId].createOffer()
        await peerConnections.current[peerId].setLocalDescription(offer)
        socket.relaySDP({ peerId, sessionDescription: offer })
      }
    }
  }

  const provideMediaRef = useCallback((id: string, node: HTMLVideoElement) => {
    const arrMediaElements = peerMediaElements.current as HTMLVideoElement[] | null
    if (arrMediaElements) arrMediaElements[id] = node
  }, [])

  useEffect(() => {
    startCapture()
    return () => {
      const localStream = localMediaStream.current
      if (localStream) {
        (<any> localStream).getTracks().forEach((track: any) => track.stop())
        socket.leaveFromCall()
      }
    }
  }, [])

  useEffect(() => {
    socket.addPeer()
  }, [])

  return { clients, provideMediaRef }
}

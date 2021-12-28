import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useStore } from 'effector-react'
import CallModal from '@/components/common/modal/call-process/CallProcess'
import OfferToCall from '@/components/common/modal/offer-call/OfferToCall'
import { ModalWindowStyled } from '@/components/common/modal/Modal'
import {
  $isShowProcessModal,
  $isShowOfferModal,
  $userSignal,
  changeIsShowCommonModal,
  changeIsShowProcessModal,
  changeIsShowOfferModal,
  changeUserStream,
} from '@/components/common/modal/common-call-modal/CommonCallModal.model'
import {
  $recipientCallUser,
  $sendlerCallUser,
  $userId,
  changeRecipientCallUser,
  changeSendlerCallUser,
} from '@/App.module'
import { User } from '@/api/types'
import socket from '@/api/socket'
import Peer from 'simple-peer'

const ModalReStyled = styled(ModalWindowStyled)`
  min-height: 320px;
  min-width: 320px;
  use {
    fill: ${(props) => props.theme.rgb(props.theme.colors.white)};
  }
  &:hover {
    use {
      fill: ${(props) => props.theme.rgb(props.theme.colors.white)};
    }
  }
`

const CommonCallModal: React.FC = () => {
  const userId = useStore($userId)
  const sendlerCallUser = useStore($sendlerCallUser) as User
  const recipientCallUser = useStore($recipientCallUser) as User
  const typeCall = userId === sendlerCallUser.user_id ? 'outgoing' : 'incomming'
  //
  const callUser =
    userId === sendlerCallUser.user_id ? recipientCallUser : sendlerCallUser
  const myInfo =
    userId === sendlerCallUser.user_id ? sendlerCallUser : recipientCallUser
  //
  const isShowModalCallOffer = useStore($isShowOfferModal)
  const isShowModalCallProcess = useStore($isShowProcessModal)
  const connectionRef = useRef<any>()
  const userSignal = useStore($userSignal)
  const [peer, setPeer] = useState<Peer.Instance>()
  //
  const answer = () => {
    changeIsShowOfferModal(false)
    changeIsShowProcessModal(true)
    socket.applyCall(callUser.user_id)
  }

  const callUserMethod = (stream: MediaStream) => {
    if (stream) {
      const localPeer = new Peer({
        initiator: true,
        trickle: false,
        stream,
      })
      setPeer(localPeer)
      if (localPeer) {
        localPeer.on('signal', (data: any) => {
          socket.sendOfferSDP({ to: callUser.user_id, signal: data })
        })
        localPeer.on('stream', (peerStream: any) => {
          changeUserStream(peerStream)
        })
        if (connectionRef && connectionRef.current) connectionRef.current = localPeer
      }
    }
	}

  const initiatorSignal = () => {
    if (peer) {
      peer.signal(userSignal)
    }
  }

  const answerCallMethod = (stream: MediaStream) => {
    if (stream) {
      const localPeer = new Peer({
        initiator: false,
        trickle: false,
        stream,
      })
      setPeer(localPeer)
      if (localPeer) {
        localPeer.on('signal', (data: any) => {
          socket.sendAnswerSDP({ signal: data, to: callUser.user_id })
        })
        localPeer.on('stream', (peerStream: any) => {
          changeUserStream(peerStream)
        })
        localPeer.signal(userSignal)
        if (connectionRef && connectionRef.current) connectionRef.current = localPeer
      }
    }
	}

  const decline = () => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const user_id =
      userId === recipientCallUser.user_id
        ? sendlerCallUser.user_id
        : recipientCallUser.user_id
    changeIsShowOfferModal(false)
    changeIsShowCommonModal(false)
    socket.declineCall(user_id)
  }

  const leaveFromCall = () => {
    changeIsShowProcessModal(false)
    changeIsShowCommonModal(false)
    if (connectionRef && connectionRef.current) connectionRef.current.destroy()
    if (sendlerCallUser && recipientCallUser)
      socket.sendLeaveFromCall({ to: callUser.user_id, from: myInfo.user_id })
  }

  useEffect(() => {
    return () => {
      leaveFromCall()
      // очищаем участников
      if (sendlerCallUser && recipientCallUser) changeSendlerCallUser(null)
      if (sendlerCallUser && recipientCallUser) changeRecipientCallUser(null)
    }
  }, [])

  return (
    <ModalReStyled>
      {isShowModalCallOffer && (
        <OfferToCall
          typeCall={typeCall}
          callUser={callUser}
          answer={() => answer()}
          decline={() => decline()}
        />
      )}
      {isShowModalCallProcess && (
        <CallModal
          myInfo={myInfo}
          userInfo={callUser}
          isInitiator={userId === sendlerCallUser.user_id}
          initiatorSignal={() => initiatorSignal()}
          callUser={(mediaStream) => callUserMethod(mediaStream)}
          answerCall={(mediaStream) => answerCallMethod(mediaStream)}
          leaveFromCall={() => leaveFromCall()}
        />
      )}
    </ModalReStyled>
  )
}

export default CommonCallModal

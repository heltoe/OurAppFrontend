import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useStore } from 'effector-react'
import CallModal from '@/components/common/modal/call-process/CallProcess'
import OfferToCall from '@/components/common/modal/offer-call/OfferToCall'
import { ModalWindowStyled } from '@/components/common/modal/Modal'
import {
  $stream,
  $isShowProcessModal,
  $isShowOfferModal,
  changeIsShowCommonModal,
  changeIsShowProcessModal,
  changeIsShowOfferModal,
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
  const stream = useStore($stream)
  const isShowModalCallOffer = useStore($isShowOfferModal)
  const isShowModalCallProcess = useStore($isShowProcessModal)
  const connectionRef = useRef(null)
  //
  const answer = () => {
    // const peer = new Peer({
    //   initiator: false,
    //   trickle: false,
    //   stream,
    // })
    // peer.on("signal", (data) => {
    //   socket.emit("answerCall", { signal: data, to: caller })
    // })
    // peer.on("stream", (stream) => {
    //   userVideo.current.srcObject = stream
    // })

    // peer.signal(callerSignal)
    // connectionRef.current = peer

    changeIsShowOfferModal(false)
    changeIsShowProcessModal(true)
    socket.applyCall({
      to: sendlerCallUser.user_id,
      recipient: recipientCallUser,
      sendler: sendlerCallUser,
    })
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
    // if (connectionRef && connectionRef.current) connectionRef.current.destroy()
    if (sendlerCallUser && recipientCallUser)
      socket.sendLeaveFromCall({ to: callUser.user_id, from: myInfo })
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
          leaveFromCall={() => leaveFromCall()}
        />
      )}
    </ModalReStyled>
  )
}

export default CommonCallModal

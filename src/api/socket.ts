import io from 'socket.io-client'
import { config } from '@/config'
import { catchIncommingMessage } from '@/components/pages/chat/ChatPage.model'
import { addToFriendShipsChanged } from '@/components/pages/friends/models/FriendShip'
import {
  fetchCountFriends,
  fetchCountOnlineFriends,
} from '@/components/pages/friends/models/Friends'
import { changeLastMessage } from '@/components/common/sidebar/SideBar.model'
import { changeIsShowModal as callProcessModalChanged } from '@/components/common/modal/call-process/CallProcess.model'
import { changeIsShowModal as offerToCallModalChanged } from '@/components/common/modal/offer-call/OfferToCall.model'
import { changeRecipientCallUser, changeSendlerCallUser } from '@/App.module'
import { Message, User, ChatItem } from '@/api/types'

export type CallUserInfo = {
  user_id: number
  full_name: string
}

const typeEmits = {
  FRIENDSHIP_ADD: 'FRIENDSHIP:ADD',
  FRIENDSHIP_ADD_MESSAGE_SENDED: 'FRIENDSHIP:ADD_MESSAGE_SENDED',
  FRIENDSHIP_REMOVE: 'FRIENDSHIP:REMOVE',
  FRIENDSHIP_REMOVE_MESSAGE_SENDED: 'FRIENDSHIP:REMOVE_MESSAGE_SENDED',
  //
  FRIEND_ADD: 'FRIEND:ADD',
  FRIEND_ADD_MESSAGE_SENDED: 'FRIEND:ADD_MESSAGE_SENDED',
  FRIEND_REMOVE: 'FRIEND:REMOVE',
  FRIEND_REMOVE_MESSAGE_SENDED: 'FRIEND:REMOVE_MESSAGE_SENDED',
  //
  CHAT_ENTER: 'CHAT:JOIN',
  CHAT_MESSAGE_SEND: 'CHAT:MESSAGE_SEND',
  CHAT_MESSAGE_SENDED: 'CHAT:MESSAGE_SENDED',
  SIDEBAR_MESSAGE_SEND: 'SIDEBAR:MESSAGE_SEND',
  SIDEBAR_MESSAGE_SENDED: 'SIDEBAR:MESSAGE_SENDED',
  //
  APP_ENTER: 'APP:ENTER',
  APP_EXIT: 'APP:EXIT',
  APP_SEND_MESSAGE: 'APP:SEND_MESSAGE',
  //
  CALL_TO_USER: 'CALL:CALL_TO_USER',
  CALL_CATCH_CALL_TO_USER: 'CALL:CATCH_CALL_TO_USER',
  CALL_APPLY_OFFER_CALL: 'CALL:APPLY_OFFER_CALL',
  CALL_CREATE_OFFER_SDP: 'CALL:CREATE_OFFER_SDP',
  CALL_DECLINE_OFFER_CALL: 'CALL:DECLINE_OFFER_CALL',
  CALL_DECLINE_CLEAN_CALL_DATA: 'CALL:DECLINE_CLEAN_CALL_DATA',
  //
  CALL_SEND_ICE_CANDIDATE: 'CALL:SEND_ICE_CANDIDATE',
  CALL_ADD_PEER: 'CALL:ADD_PEER',
  CALL_LEAVE_FROM_CALL: 'CALL:LEAVE_FROM_CALL',
  CALL_LEAVED_FROM_CALL: 'CALL:LEAVED_FROM_CALL',

  CALL_JOIN_TO_CALL: 'CALL:JOIN_TO_CALL',
  CALL_RELAY_SDP: 'CALL:RELAY_SDP',
  CALL_SESSION_DESCRIPTION: 'CALL_SESSION_DESCRIPTION',
  CALL_ICE_CANDIDATE: 'CALL:ICE_CANDIDATE',
}

const options = {
  'force new connection': true,
  reconnectionAttempts: 'Infinity',
  timeout: 10000,
  transports: ['websocket']
}

class SocketApi {
  private socket: any
  private user_id: number | undefined
  
  private connect() {
    // if (!this.socket) this.socket = io(config.BACKEND_URL, options)
    if (!this.socket) this.socket = io(config.BACKEND_URL)
    this.socket.on(typeEmits.CHAT_MESSAGE_SENDED, (data: Message) => {
      catchIncommingMessage(data)
    })
    this.socket.on(typeEmits.SIDEBAR_MESSAGE_SENDED, (data: ChatItem) => {
      changeLastMessage(data)
    })
    this.socket.on(typeEmits.FRIENDSHIP_ADD_MESSAGE_SENDED, (data: { user: User, recipient: number }) => {
      if (data.recipient === this.user_id) addToFriendShipsChanged(data.user) // TODO: add notification
    })
    this.socket.on(typeEmits.FRIENDSHIP_REMOVE_MESSAGE_SENDED, (data: { user: User, recipient: number }) => {
      if (data.recipient === this.user_id) console.log(data.user) // TODO: add notification
    })
    this.socket.on(typeEmits.FRIEND_ADD_MESSAGE_SENDED, (data: { user: User, recipient: number }) => {
      if (data.recipient === this.user_id) {
        fetchCountFriends()
        fetchCountOnlineFriends()
        // TODO: add notification
      }
    })
    this.socket.on(typeEmits.FRIEND_REMOVE_MESSAGE_SENDED, (data: { user: User, recipient: number }) => {
      if (data.recipient === this.user_id) {
        fetchCountFriends()
        fetchCountOnlineFriends()
        // TODO: add no tification
      }
    })
    this.socket.on(typeEmits.CALL_CATCH_CALL_TO_USER, (data: { sendler: User; recipient: User }) => {
      changeSendlerCallUser(data.sendler)
      changeRecipientCallUser(data.recipient)
      offerToCallModalChanged(true)
    })
    this.socket.on(typeEmits.CALL_CREATE_OFFER_SDP, () => {
      callProcessModalChanged(true)
      offerToCallModalChanged(false)
    })
    this.socket.on(typeEmits.CALL_DECLINE_CLEAN_CALL_DATA, () => {
      changeSendlerCallUser(null)
      changeRecipientCallUser(null)
      offerToCallModalChanged(false)
    })
    //
    this.socket.on(typeEmits.CALL_ADD_PEER, (data: { recipient_id: number, iceCandidate: any }) => {
      console.log(data)
    })
    this.socket.on(typeEmits.CALL_LEAVED_FROM_CALL, () => {
      callProcessModalChanged(false)
    })
  }

  public disconnect() {
    if (this.socket) this.socket.off()
  }

  public enterToApp(user_id: number) {
    this.socket.emit(typeEmits.APP_ENTER, user_id)
  }

  //
  public addToFriendShip(data: { user: User, recipient: number }) {
    this.socket.emit(typeEmits.FRIENDSHIP_ADD, data)
  }

  public removeFromFriendShip(data: { user: User, recipient: number }) {
    this.socket.emit(typeEmits.FRIENDSHIP_REMOVE, data)
  }

  //
  public addToFriend(data: { user: User, recipient: number }) {
    this.socket.emit(typeEmits.FRIEND_ADD, data)
  }

  public removeFromFriend(chat_id: number) {
    this.socket.emit(typeEmits.FRIEND_REMOVE, chat_id)
  }

  //
  public enterToChat(chat_id: number) {
    this.socket.emit(typeEmits.CHAT_ENTER, chat_id)
  }

  public sendMessage(data: {
    user: User
    message: Message
    recipient_id: number
  }) {
    this.socket.emit(typeEmits.CHAT_MESSAGE_SEND, data.message)
    this.socket.emit(typeEmits.SIDEBAR_MESSAGE_SEND, {
      chat_id: data.message.chat_id,
      last_message: {
        message_id: data.message.message_id,
        message: data.message.message,
        date: data.message.date,
        author: data.message.author,
        files: data.message.files,
      },
      recipient_info: data.user,
      user_id: data.recipient_id,
    })
  }

  // принятие или отказ от звонка
  public callToUser(data: { sendler: User; recipient: User }) {
    offerToCallModalChanged(true)
    this.socket.emit(typeEmits.CALL_TO_USER, data)
  }

  public applyCall(user_id: number) {
    callProcessModalChanged(true)
    this.socket.emit(typeEmits.CALL_APPLY_OFFER_CALL, user_id)
  }

  public declineCall(user_id: number) {
    this.socket.emit(typeEmits.CALL_DECLINE_OFFER_CALL, user_id)
  }

  // процесс звонка
  public sendIceCandidate(data: { recipient_id: number, iceCandidate: any }) {
    this.socket.emit(typeEmits.CALL_SEND_ICE_CANDIDATE, data)
  }

  public sendOfferSDP(data: { recipient_id: number, sessionDescription: any }) {
    this.socket.emit(typeEmits.CALL_RELAY_SDP, data)
  }

  public joinToCall(data: {
    user_info: CallUserInfo
    recipient_info: CallUserInfo
  }) {
    this.socket.emit(typeEmits.CALL_JOIN_TO_CALL, data)
  }

  public leaveFromCall(recipient_id: number) {
    callProcessModalChanged(false)
    this.socket.emit(typeEmits.CALL_LEAVE_FROM_CALL, recipient_id)
  }

  public addPeer(args: any) {

  }

  public init(user_id: number) {
    this.user_id = user_id
    this.connect()
  }
}

const socket = new SocketApi()
export default socket

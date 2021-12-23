import io from 'socket.io-client'
import { config } from '@/config'
import { catchIncommingMessage } from '@/components/pages/chat/ChatPage.model'
import { addToFriendShipsChanged } from '@/components/pages/friends/models/FriendShip'
import {
  fetchCountFriends,
  fetchCountOnlineFriends,
} from '@/components/pages/friends/models/Friends'
import { changeLastMessage } from '@/components/common/sidebar/SideBar.model'
import {
  changeIsShowCommonModal,
  changeIsShowProcessModal,
  changeIsShowOfferModal,
} from '@/components/common/modal/common-call-modal/CommonCallModal.model'
import { changeRecipientCallUser, changeSendlerCallUser } from '@/App.module'
import { Message, User, ChatItem } from '@/api/types'

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
  CALL_SEND_OFFER_SDP: 'CALL:SEND_OFFER_SDP',
  CALL_CREATE_ANSWER_SDP: 'CALL:CREATE_ANSWER_SDP',
  CALL_SEND_ANSWER_SDP: 'CALL:SEND_ANSWER_SDP',
  CALL_CATCH_ANSWER_SDP: 'CALL:CATCH_ANSWER_SDP',
  CALL_LEAVE_FROM_CALL: 'CALL:LEAVE_FROM_CALL',
  CALL_LEAVED_FROM_CALL: 'CALL:LEAVED_FROM_CALL',
}

const options = {
  'force new connection': true,
  reconnectionAttempts: 'Infinity',
  timeout: 10000,
  transports: ['websocket'],
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

    this.socket.on(
      typeEmits.FRIENDSHIP_ADD_MESSAGE_SENDED,
      (data: { user: User; recipient: number }) => {
        if (data.recipient === this.user_id) addToFriendShipsChanged(data.user) // TODO: add notification
      },
    )

    this.socket.on(
      typeEmits.FRIENDSHIP_REMOVE_MESSAGE_SENDED,
      (data: { user: User; recipient: number }) => {
        if (data.recipient === this.user_id) console.log(data.user) // TODO: add notification
      },
    )

    this.socket.on(
      typeEmits.FRIEND_ADD_MESSAGE_SENDED,
      (data: { user: User; recipient: number }) => {
        if (data.recipient === this.user_id) {
          fetchCountFriends()
          fetchCountOnlineFriends()
          // TODO: add notification
        }
      },
    )

    this.socket.on(
      typeEmits.FRIEND_REMOVE_MESSAGE_SENDED,
      (data: { user: User; recipient: number }) => {
        if (data.recipient === this.user_id) {
          fetchCountFriends()
          fetchCountOnlineFriends()
          // TODO: add no tification
        }
      },
    )

    this.socket.on(
      typeEmits.CALL_CATCH_CALL_TO_USER,
      (data: { sendler: User; recipient: User }) => {
        // мне позвонили и отображаем окна
        changeSendlerCallUser(data.sendler)
        changeRecipientCallUser(data.recipient)
        changeIsShowCommonModal(true)
        changeIsShowOfferModal(true)
      },
    )

    this.socket.on(typeEmits.CALL_CREATE_OFFER_SDP, () => {
      // мне ответили на звонок
      changeIsShowOfferModal(false)
      changeIsShowProcessModal(true)
      // changeSendlerCallUser(data.sendler)
      // changeRecipientCallUser(data.recipient)
      // // запись участников звонка
      // changeParticipantCall(data.sendler)
      // changeParticipantCall(data.recipient)
    })

    this.socket.on(typeEmits.CALL_DECLINE_CLEAN_CALL_DATA, () => {
      // мне отменили вызов
      changeIsShowOfferModal(false)
      changeIsShowCommonModal(false)
    })
    //
    this.socket.on(typeEmits.CALL_CREATE_ANSWER_SDP, (data: { to: number, signal: any }) => {
      // changeSettingsToCall({ id: data.to, type: 'answer', signal: data.signal })
    })

    this.socket.on(typeEmits.CALL_CATCH_ANSWER_SDP, (signal: any) => {
      // changePeerSignal(signal)
    })
    this.socket.on(typeEmits.CALL_LEAVED_FROM_CALL, (user_info: User) => {
      // он вышел из звонка
      changeIsShowProcessModal(false)
      changeIsShowCommonModal(false)
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
    // открываем себе модальные окна
    changeIsShowCommonModal(true)
    changeIsShowOfferModal(true)
    this.socket.emit(typeEmits.CALL_TO_USER, data)
  }

  public applyCall(data: { to: number, recipient: User, sendler: User }) {
    // принимаю вызов
    changeIsShowOfferModal(false)
    changeIsShowProcessModal(true)
    this.socket.emit(typeEmits.CALL_APPLY_OFFER_CALL, data)
  }

  public declineCall(user_id: number) {
    // отклоняю вызов
    changeIsShowOfferModal(false)
    changeIsShowCommonModal(false)
    this.socket.emit(typeEmits.CALL_DECLINE_OFFER_CALL, user_id)
  }

  // процесс звонка
  public sendOfferSDP(data: { to: number, signal: any }) {
    this.socket.emit(typeEmits.CALL_SEND_OFFER_SDP, data)
  }

  public sendAnswerSDP(data: { to: number, signal: any }) {
    this.socket.emit(typeEmits.CALL_SEND_ANSWER_SDP, data)
  }

  public sendLeaveFromCall(data: { to: number, from: User }) {
    this.socket.emit(typeEmits.CALL_LEAVE_FROM_CALL, data)
  }

  public init(user_id: number) {
    this.user_id = user_id
    this.connect()
  }
}

const socket = new SocketApi()
export default socket

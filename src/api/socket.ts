import io from 'socket.io-client'
import { config } from '@/config'
import { catchIncommingMessage } from '@/components/pages/chat/ChatPage.model'
import { addToFriendShipsChanged } from '@/components/pages/friends/models/FriendShip'
import {
  fetchCountFriends,
  fetchCountOnlineFriends,
} from '@/components/pages/friends/models/Friends'
import { changeLastMessage } from '@/components/common/sidebar/SideBar.model'
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
}

class SocketApi {
  private socket: any
  private user_id: number | undefined
  private connect() {
    if (!this.socket) this.socket = io(config.BACKEND_URL)
    this.socket.on(typeEmits.CHAT_MESSAGE_SENDED, (data: Message) => {
      catchIncommingMessage(data)
    })
    this.socket.on(typeEmits.SIDEBAR_MESSAGE_SENDED, (data: ChatItem) => {
      console.log(data, 111)
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
  public sendMessage(data: { user: User, message: Message, recipient_id: number }) {
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
  public init(user_id: number) {
    this.user_id = user_id
    this.connect()
  }
}

const socket = new SocketApi()
export default socket

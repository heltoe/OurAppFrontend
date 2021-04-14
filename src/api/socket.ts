import io from 'socket.io-client'
import { config } from '@/config'
import {
  changeChatId,
  catchIncommingMessage,
} from '@/components/pages/chat/ChatPage.model'
import {
  SendMessageFxResponse,
  SendMessageFxParams
} from '@/api/types'

const typeEmits = {
  CHAT_ENTER: 'CHAT:JOIN',
  CHAT_MESSAGE_SEND: 'CHAT:MESSAGE_SEND',
  CHAT_MESSAGE_SENDED: 'CHAT:MESSAGE_SENDED',
  APP_EXIT: 'APP:EXIT',
  APP_SEND_MESSAGE: 'APP:SEND_MESSAGE'
}

class SocketApi {
  private socket: any
  private connect() {
    if (!this.socket) this.socket = io(config.BACKEND_URL)
    this.socket.on(typeEmits.CHAT_MESSAGE_SENDED, (data: SendMessageFxResponse) => {
      // changeChatId(data.chat_id)
      console.log(data)
      catchIncommingMessage(data.message)
    })
  }
  public disconnect() {
    if (this.socket) this.socket.off()
  }
  public enterToChat(chat_id: number) {
    this.socket.emit(typeEmits.CHAT_ENTER, chat_id)
  }
  public sendMessage(data: SendMessageFxParams) {
    this.socket.emit(typeEmits.CHAT_MESSAGE_SEND, data)
  }
  public init() {
    this.connect()
  }
}

const socket = new SocketApi()
export default socket

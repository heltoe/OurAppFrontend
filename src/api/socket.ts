import io from 'socket.io-client'
import { config } from '@/config'

const typeEmits = {
  APP_ENTER: 'APP:ENTER',
  APP_EXIT: 'APP:EXIT',
  APP_SEND_MESSAGE: 'APP:SEND_MESSAGE'
}

class SocketApi {
  private userId: number
  private socket: any
  constructor(userId: number) {
    this.userId = userId
  }
  private connect() {
    if (!this.socket) this.socket = io(config.BACKEND_URL)
  }
  public disconnect() {
    if (this.socket) this.socket.off()
  }
  public init() {
    this.connect()
  }
}

import { omits } from '../libs/functional';


interface Message {
  id: string;
  sender: string;
  receiver: string;
  content: string;
  type: string;
  timestamp: number;
  read: boolean;
}

class MessageManager {
  private messages: Map<string, Message> = new Map();

  /**
   * 添加消息
   */
  addMessage(sender: string, receiver: string, content: string, type: string = 'text') {
    const id = crypto.randomUUID();
    const message: Message = {
      id,
      sender,
      receiver,
      content,
      type,
      timestamp: Date.now(),
      read: false,
    };
    this.messages.set(id, message);
    return id;
  }

  /**
   * 通过ID获取消息
   */
  getMessageById(id: string) {
    const message = this.messages.get(id);
    if (message) {
      message.read = true;
      this.messages.set(id, message);
    }
    return message;
  }

  /**
   * 通过接收者获取消息
   * 返回的消息只包含id, sender, content, type, timestamp, 不包含content
   */
  getMessagesByReceiver(receiver: string) {
    return Array.from(this.messages.values())
      .filter(msg => msg.receiver === receiver)
      .sort((a, b) => b.timestamp - a.timestamp)
      .map(x => omits(x, 'content'));
  }

  /**
   * 通过ID删除消息
   */
  deleteMessageById(id: string) {
    this.messages.delete(id);
  }
}

export default new MessageManager(); 
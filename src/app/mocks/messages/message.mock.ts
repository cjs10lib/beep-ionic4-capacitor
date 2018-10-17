import { Message } from '../../models/messages/messages.model';
import { USER_LIST } from '../users/user.mock';

const messageList: Message[] = [];

USER_LIST.forEach(user => {
    messageList.push({ user: user, lastMessage: 'How are you?', created: new Date() });
    messageList.push({ user: user, lastMessage: 'Am comming', created: new Date() });
    messageList.push({ user: user, lastMessage: 'Where are you', created: new Date() });
});

export const MESSAGE_LIST = messageList;

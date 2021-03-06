import { GroupMessage } from '../../models/messages/messages.model';
import { USER_LIST } from '../users/user.mock';

const messageList: GroupMessage[] = [];

USER_LIST.forEach(user => {
    messageList.push({ user: user.firstName, lastMessage: 'How are you?', created: new Date() });
    messageList.push({ user: user.firstName, lastMessage: 'Am comming', created: new Date() });
    messageList.push({ user: user.firstName, lastMessage: 'Where are you', created: new Date() });
});

export const MESSAGE_LIST = messageList;

import { User } from '../../models/users/user.model';
import { Message } from '../../models/messages/messages.model';

const userList: User[] = [
    { firstName: 'John', lastName: 'Doe', avatar: 'assets/avatar/avatar.png', phoneNumber: '08087881103', email: 'john@doe.com' },
    { firstName: 'Mary', lastName: 'Stew', avatar: 'assets/avatar/avatar.png', phoneNumber: '09098776534', email: 'mary@stew.com' },
    { firstName: 'Martin', lastName: 'PK', avatar: 'assets/avatar/avatar.png', phoneNumber: '76753456267', email: 'martin@PK.com' },
    { firstName: 'Steve', lastName: 'Okoro', avatar: 'assets/avatar/avatar.png', phoneNumber: '7675465427', email: 'steve@okoro.com' },
];

const messageList: Message[] = [];

userList.forEach(user => {
    messageList.push({ user: user, created: new Date() });
    messageList.push({ user: user, created: new Date() });
    messageList.push({ user: user, created: new Date() });
});

export const MESSAGE_LIST = messageList;

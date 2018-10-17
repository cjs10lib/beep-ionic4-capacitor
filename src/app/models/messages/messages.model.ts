import { User } from '../users/user.model';

export interface Message {
    user?: User;
    lastMessage?: string;
    created?: Date;
}

import { Profile } from './../profile/profile.model';

export interface Message {
    message?: string;
    user?: string;
    group?: string;
    lastMessage?: string;
    created?: any;
    lastUpdate?: any;
}

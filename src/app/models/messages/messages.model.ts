import { Profile } from './../profile/profile.model';

export interface Message {
    uid?: string;
    message?: string;
    user?: string;
    group?: string;
    lastMessage?: string;
    created?: any;
    lastUpdate?: any;
}

import { Profile } from './../profile/profile.model';

export interface GroupMessage {
    uid?: string;
    message?: string;
    user?: string;
    group?: string;
    lastMessage?: string;
    created?: any;
    lastUpdate?: any;
}

export interface PrivateMessage {
    uid?: string;
    message?: string;
    from?: string;
    to?: string;
    pairedId?: string;
    delivered?: boolean;
    read?: boolean;
    lastMessage?: string;
    created?: any;
    lastUpdate?: any;
}

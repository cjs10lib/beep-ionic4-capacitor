import { Profile } from './../profile/profile.model';

export interface Message {
    user?: Profile;
    lastMessage?: string;
    created?: Date;
}

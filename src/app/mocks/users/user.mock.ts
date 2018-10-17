import { Profile } from '../../models/profile/profile.model';

const userList: Profile[] = [
    { firstName: 'John', lastName: 'Doe', avatar: 'assets/avatar/avatar.png', phoneNumber: '08087881103', email: 'john@doe.com' },
    { firstName: 'Mary', lastName: 'Stew', avatar: 'assets/avatar/avatar.png', phoneNumber: '09098776534', email: 'mary@stew.com' },
    { firstName: 'Martin', lastName: 'PK', avatar: 'assets/avatar/avatar.png', phoneNumber: '76753456267', email: 'martin@PK.com' },
    { firstName: 'Steve', lastName: 'Okoro', avatar: 'assets/avatar/avatar.png', phoneNumber: '7675465427', email: 'steve@okoro.com' },
];

export const USER_LIST = userList;

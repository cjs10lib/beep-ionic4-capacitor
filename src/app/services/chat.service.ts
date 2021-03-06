import { GroupMessage, PrivateMessage } from './../models/messages/messages.model';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Group } from '../models/group/group.model';
import * as firebase from 'firebase';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  groupCol: AngularFirestoreCollection<Group>;
  groups: Observable<Group[]>;

  constructor(private db: AngularFirestore, private authService: AuthService) {
    this.groupCol = this.db.collection('group-names');

    this.groups = this.groupCol.stateChanges().pipe(
      map(change => {
        return change.map(a => {
          const data = a.payload.doc.data() as Group;
          data.uid = a.payload.doc.id;

          return data;
        });
      })
    );
  }

  async verifyIfGroupExistGroup(groupName: string) {
    return (await this.db.doc(`group-names/${groupName.toLowerCase()}`).ref.get()).exists;
  }

  getGroups() {
    return this.groups;
  }

  getGroup(groupId: string) {
    return this.db.doc(`group-names/${groupId}`).valueChanges().pipe(take(1));
  }

  async addGroup(groupName: string, user: User) {
    const group: Group = {
      name: groupName,
      createdBy: user.uid,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    };

    return await this.db.doc(`group-names/${group.name.toLowerCase()}`).set(group);
  }

  async sendGroupChat(sentMessage: string, user: User, group: string) {
    const message: GroupMessage = {
      message: sentMessage,
      user: user.uid,
      group: group,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    };

    return await this.db.collection('group-chat').add(message);
  }

  getGroupChat(groupId: string) {
    return this.db.collection('group-chat', ref => ref.where('group', '==', groupId).orderBy('created')).valueChanges();
  }

  private createPrivateChatPairId(user1: string, user2: string) {
    let pairId;

    if (user1 < user2) {
      pairId = `${user1}|${user2}`;
    } else {
      pairId = `${user2}|${user1}`;
    }

    return pairId;
  }

  async sendPrivateChat(sentMessage: string, sender: string, reciever: string) {
    const pairedId = this.createPrivateChatPairId(sender, reciever);

    const message: PrivateMessage = {
      message: sentMessage,
      from: sender,
      to: reciever,
      pairedId: pairedId,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    };

    return await this.db.collection('private-chat').add(message);
  }

  getPrivateChat(sender: string, reciever: string): Observable<PrivateMessage[]> {
    const pairedId = this.createPrivateChatPairId(sender, reciever);
    return this.db.collection('private-chat', ref => ref.where('pairedId', '==', pairedId).orderBy('created')).valueChanges();
  }
}




import { Profile } from './../models/profile/profile.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { User } from 'firebase';

import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  usersCol: AngularFirestoreCollection<Profile>;
  users$: Observable<Profile[]>;

  constructor(private db: AngularFirestore) {
    this.usersCol = this.db.collection('profiles');

    this.users$ = this.usersCol.snapshotChanges().pipe(
      map(change => {
        return change.map(a => {
          const data = a.payload.doc.data() as Profile;
          data.uid = a.payload.doc.id;

          return data;
        });
      })
    );
  }

  getUsers() {
    return this.users$;
  }

  getProfile(user: User) {
    return this.db.doc(`profiles/${user.uid}`).valueChanges().pipe(take(1));
  }

  async saveProfile(user: User, profile: Profile) {

    profile.email = user.email;
    profile.created = firebase.firestore.FieldValue.serverTimestamp();

    try {
      await this.db.doc(`profiles/${user.uid}`).set(profile);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

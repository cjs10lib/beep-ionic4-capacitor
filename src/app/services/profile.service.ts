import { Profile } from './../models/profile/profile.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { User } from 'firebase';

import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private db: AngularFirestore) { }

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

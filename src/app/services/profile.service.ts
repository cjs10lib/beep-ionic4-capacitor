import { AuthService } from './auth.service';
import { Profile } from './../models/profile/profile.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { User } from 'firebase';

import { take, map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  usersCol: AngularFirestoreCollection<Profile>;
  users$: Observable<Profile[]>;

  constructor(private db: AngularFirestore, private authService: AuthService) {
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

  getProfile(userId: string): Observable<Profile> {
    return this.db.doc(`profiles/${userId}`).valueChanges().pipe(take(1));
  }

  getAuthenticatedUserProfile(): Observable<Profile> {
    return this.authService.getAuthState()
      .pipe(map(user => user.uid),
      mergeMap(authId => this.db.doc(`profiles/${authId}`)
      .valueChanges().pipe(take(1))));
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

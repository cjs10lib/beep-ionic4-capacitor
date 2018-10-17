import { LoginResponse } from './../models/login-response/login-response.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Account } from '../models/account/account.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  getAuthState() {
    return this.auth.authState;
  }

  async signInWithEmailAndPassword(account: Account) {
    try {
      return <LoginResponse> {
        result: await this.auth.auth.signInWithEmailAndPassword(account.email, account.password)
      };
    } catch (e) {
      return <LoginResponse> {
        error: e
      };
    }
  }

  async createUserWithEmailAndPassword(account: Account) {
    try {
      return <LoginResponse> {
        result: await this.auth.auth.createUserWithEmailAndPassword(account.email, account.password)
      };
    } catch (e) {
      return <LoginResponse>{
        error: e
      };
    }
  }
}

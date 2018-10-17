import { LoginResponse } from './../../models/login-response/login-response.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../../models/account/account.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  @Output() registerStatus: EventEmitter<LoginResponse>;

  account = {} as Account;

  constructor(private router: Router, private authService: AuthService) {
    this.registerStatus = new EventEmitter<LoginResponse>();
  }

  ngOnInit() {
  }

  async register() {
    const result = await this.authService.createUserWithEmailAndPassword(this.account);
    this.registerStatus.emit(result);
  }

  navigateToLoginPage() {
    this.router.navigate(['login']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../../models/account/account.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  account = {} as Account;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  async register() {
    const result = await this.authService.createUserWithEmailAndPassword(this.account);
    console.log(result);
  }

  navigateToLoginPage() {
    this.router.navigate(['login']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from '../models/login-response/login-response.model';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private router: Router, private toast: ToastController) { }

  ngOnInit() { }

  async register(event: LoginResponse) {
    if (!event.error) {
      (await this.toast.create({ message: `Welcome to beep ${event.result.user.email}`, duration: 3000 })).present();

      this.router.navigate(['tabs']);
    } else {
      (await this.toast.create({ message: event.error.message, duration: 3000 })).present();
    }
  }

}

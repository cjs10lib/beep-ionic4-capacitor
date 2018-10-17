
import { ProfileService } from './../services/profile.service';
import { LoginResponse } from './../models/login-response/login-response.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private toast: ToastController,
              private router: Router,
              private profileService: ProfileService) { }

  ngOnInit() { }

  async login(event: LoginResponse) {
    if (!event.error) {
      (await this.toast.create({ message: `Welcome to beep ${event.result.user.email}`, duration: 3000 })).present();

      this.profileService.getProfile(<User>event.result.user).subscribe(profile => {
        profile ? this.router.navigate(['tabs']) : this.router.navigate(['edit-profile']);
      });
    } else {
      (await this.toast.create({ message: event.error.message, duration: 3000 })).present();
    }
  }

}

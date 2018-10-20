import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

import { LoginResponse } from './../models/login-response/login-response.model';
import { ProfileService } from './../services/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private toast: ToastController,
              private router: Router,
              private nav: NavController,
              private profileService: ProfileService) { }

  ngOnInit() { }

  async login(event: LoginResponse) {
    if (!event.error) {
      (await this.toast.create({ message: `Welcome to beep ${event.result.user.email}`, duration: 3000 })).present();

      const userId = event.result.user.uid;

      this.profileService.getProfile(userId).subscribe(profile => {
        profile ? this.nav.navigateRoot('/tabs') : this.nav.navigateRoot('/edit-profile');
        // profile ? this.router.navigate(['tabs']) : this.router.navigate(['edit-profile']);
      });
    } else {
      (await this.toast.create({ message: event.error.message, duration: 3000 })).present();
    }
  }

}

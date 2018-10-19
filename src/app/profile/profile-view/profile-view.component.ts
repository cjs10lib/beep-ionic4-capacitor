import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { Profile } from '../../models/profile/profile.model';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from './../../services/auth.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit, OnDestroy {

  profile = {} as Profile;

  subscription: Subscription;

  constructor(private authService: AuthService,
              private profileService: ProfileService,
              private loading: LoadingController,
              private router: Router) { }

  async ngOnInit() {
    const loader = await this.loading.create({ message: 'Loading profile...' });
    loader.present();

    this.subscription = this.authService.getAuthState().subscribe(user => {

      if (user) {
        this.profileService.getProfile(user).subscribe(profile => {
          this.profile = profile;

          loader.dismiss();
        });
      }
    });

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async signOut() {
    await this.authService.signOut();
    this.router.navigate(['login']);
  }

}

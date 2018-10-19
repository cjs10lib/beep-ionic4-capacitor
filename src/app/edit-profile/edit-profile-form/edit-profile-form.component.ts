import { LoadingController } from '@ionic/angular';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { User } from 'firebase';
import { Subscription } from 'rxjs';

import { Profile } from '../../models/profile/profile.model';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.scss']
})
export class EditProfileFormComponent implements OnInit, OnDestroy {

  @Output() saveProfileResult: EventEmitter<boolean>;

  authenticatedUser: User;
  profile = {} as Profile;

  subscription: Subscription;

  constructor(private profileService: ProfileService,
              private authService: AuthService,
              private loading: LoadingController) {
    this.saveProfileResult = new EventEmitter<boolean>();
  }

  async ngOnInit() {
    const loader = await this.loading.create({ message: 'Loading profile...' });
    loader.present();

    this.subscription = this.authService.getAuthState().subscribe(user => {
      this.authenticatedUser = user;

      this.profileService.getProfile(user).subscribe(profile => this.profile = profile);
      loader.dismiss();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async saveProfile() {
    if (this.authenticatedUser) {
      const result = await this.profileService.saveProfile(this.authenticatedUser, this.profile);
      this.saveProfileResult.emit(result);
    }
  }

}

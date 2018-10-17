
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Profile } from '../../models/profile/profile.model';
import { ProfileService } from '../../services/profile.service';
import { Subscription } from 'rxjs';
import { User } from 'firebase';

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

  constructor(private profileService: ProfileService, private authService: AuthService) {
    this.saveProfileResult = new EventEmitter<boolean>();
  }

  ngOnInit() {
    this.subscription = this.authService.getAuthState().subscribe(user => {
      this.authenticatedUser = user;
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

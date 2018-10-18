import { Subscription } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Profile } from '../../models/profile/profile.model';
import { ProfileService } from '../../services/profile.service';
import { LoadingController } from '@ionic/angular';
import { User } from 'firebase';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit, OnDestroy {

  @Output() user: EventEmitter<User>;

  profile = {} as Profile;

  subscription: Subscription;

  constructor(private authService: AuthService,
              private profileService: ProfileService,
              private loading: LoadingController) {
                this.user = new EventEmitter<User>();
              }

  async ngOnInit() {
    const loader = await this.loading.create({ message: 'Loading profile...' });
    loader.present();

    this.subscription = this.authService.getAuthState().subscribe(user => {
      this.profileService.getProfile(user).subscribe(profile => {
        this.profile = profile;

        console.log(profile);
        loader.dismiss();

        this.user.emit(user);
      });
    });

    console.log('loaded');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    console.log('destroyed');

    // if (this.profileSubscription) {
    //   this.profileSubscription.unsubscribe();
    // }
  }

}

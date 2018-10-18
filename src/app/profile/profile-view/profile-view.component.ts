import { Subscription } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Profile } from '../../models/profile/profile.model';
import { ProfileService } from '../../services/profile.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit, OnDestroy {

  profile = {} as Profile;
  loader: any;

  subscription: Subscription;

  constructor(private authService: AuthService,
              private profileService: ProfileService,
              private loading: LoadingController) { }

  async ngOnInit() {
    const loader = await this.loading.create({ message: 'Loading profile...' });
    loader.present();

    this.subscription = this.authService.getAuthState().subscribe(user => {
      this.subscription.add(this.profileService.getProfile(user).subscribe(profile => {
        this.profile = profile;
        loader.dismiss();
      }));
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

import { ProfileService } from './../../services/profile.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { UserStatus } from '../../models/user-status/user-status.model';
import { Profile } from '../../models/profile/profile.model';

@Component({
  selector: 'app-online-users',
  templateUrl: './online-users.component.html',
  styleUrls: ['./online-users.component.scss']
})
export class OnlineUsersComponent implements OnInit, OnDestroy {

  onlineUsers: UserStatus[] = [];
  onlineUsersProfile: Profile[] = [];

  subscription: Subscription;

  constructor(private profileService: ProfileService, private auth: AngularFireAuth) { }

  ngOnInit() {
    this.profileService.setOnlineStatus();

    const currentUserId = this.auth.auth.currentUser.uid;

    if (currentUserId) {
      this.subscription = this.profileService.getOnlineUsers().subscribe(status => {

        const profile: Profile[] = [];
        status.forEach(user => {

          // verify if user is current user
          if (user.uid !== currentUserId) {
            this.profileService.getProfile(user.uid).subscribe(userProfile => {
              profile.push({ uid: user.uid, ...userProfile });
            });
          }

        });

        this.onlineUsersProfile = profile;
      });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

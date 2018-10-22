import { Router } from '@angular/router';
import { ProfileService } from './../../services/profile.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription, Subject } from 'rxjs';
import { concatMap, takeUntil } from 'rxjs/operators';
import { UserStatus } from '../../models/user-status/user-status.model';
import { Profile } from '../../models/profile/profile.model';

@Component({
  selector: 'app-online-users',
  templateUrl: './online-users.component.html',
  styleUrls: ['./online-users.component.scss']
})
export class OnlineUsersComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  onlineUsers: UserStatus[] = [];
  onlineUsersProfile: Profile[] = [];

  subscription: Subscription;

  constructor(private profileService: ProfileService, private auth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.profileService.setOnlineStatus();

    const currentUserId = this.auth.auth.currentUser.uid;

    if (currentUserId) {
      this.subscription = this.profileService.getOnlineUsers()
        .pipe(takeUntil(this.destroy$))
        .subscribe(status => {

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
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  openChat(user: Profile) {
    this.router.navigate(['message', user.uid]);
  }

}

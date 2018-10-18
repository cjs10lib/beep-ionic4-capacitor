import { Subscription } from 'rxjs';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile/profile.model';

@Component({
  selector: 'app-profile-search',
  templateUrl: './profile-search.component.html',
  styleUrls: ['./profile-search.component.scss']
})
export class ProfileSearchComponent implements OnInit, OnDestroy {

  @Input() query: string;

  users: Profile[] = [];
  filteredUsers: Profile[] = [];

  subscription: Subscription;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.subscription = this.profileService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  searchUser() {
    this.filteredUsers = this.query ? this.users.filter(u => u.firstName.toLowerCase().includes(this.query.toLowerCase()) ||
      u.lastName.toLowerCase().includes(this.query.toLowerCase())) : null;
  }

}

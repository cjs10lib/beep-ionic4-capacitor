import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { Profile } from './../models/profile/profile.model';
import { ProfileService } from './../services/profile.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  selectedUserProfile = {} as Profile;

  constructor(private route: ActivatedRoute,
              private nav: NavController,
              private profileService: ProfileService) { }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');

    this.profileService.getselectedUser(userId).subscribe(profile => {
      this.selectedUserProfile = profile;
      console.log(profile);
    });
  }

  navigateToTabsPage() {
    this.nav.navigateRoot('/tabs');
  }

}

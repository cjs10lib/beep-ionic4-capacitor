import { Message } from './../models/messages/messages.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { Profile } from './../models/profile/profile.model';
import { ProfileService } from './../services/profile.service';
import { MESSAGE_LIST } from '../mocks/messages/message.mock';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  selectedUserProfile = {} as Profile;
  messageList: Message[] = [];

  constructor(private route: ActivatedRoute,
              private nav: NavController,
              private profileService: ProfileService) { }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');

    this.profileService.getselectedUser(userId).subscribe(profile => {
      this.selectedUserProfile = profile;
    });

    this.messageList = MESSAGE_LIST;
  }

  navigateToTabsPage() {
    this.nav.navigateRoot('/tabs');
  }

}

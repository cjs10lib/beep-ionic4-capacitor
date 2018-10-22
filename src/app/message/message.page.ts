import { AngularFireAuth } from '@angular/fire/auth';
import { GroupMessage } from './../models/messages/messages.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { Profile } from './../models/profile/profile.model';
import { ProfileService } from './../services/profile.service';
import { MESSAGE_LIST } from '../mocks/messages/message.mock';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  authUserId: string;
  selectedUserProfileId: string;
  selectedUserProfile = {} as Profile;
  messageList: GroupMessage[] = [];

  constructor(private route: ActivatedRoute,
              private nav: NavController,
              private profileService: ProfileService,
              private chatService: ChatService,
              private auth: AngularFireAuth) { }

  ngOnInit() {
    this.authUserId = this.auth.auth.currentUser.uid;
    this.selectedUserProfileId = this.route.snapshot.paramMap.get('id');

    this.profileService.getProfile(this.selectedUserProfileId).subscribe(profile => {
      this.selectedUserProfile = profile;
    });
  }

  async sendMessage(event: string) {
    await this.chatService.sendPrivateChat(event, this.selectedUserProfileId, this.authUserId);
  }

  navigateToTabsPage() {
    this.nav.navigateRoot('/tabs');
  }

}

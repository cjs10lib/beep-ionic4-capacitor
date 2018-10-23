import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { GroupMessage, PrivateMessage } from './../models/messages/messages.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, Content } from '@ionic/angular';

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

  messages$: Observable<PrivateMessage[]>;

  @ViewChild(Content) content: Content;

  constructor(private route: ActivatedRoute,
              private nav: NavController,
              private profileService: ProfileService,
              private chatService: ChatService,
              private auth: AngularFireAuth) { }

  ngOnInit() {
    this.authUserId = this.auth.auth.currentUser.uid;
    this.selectedUserProfileId = this.route.snapshot.paramMap.get('id');

    this.messages$ = this.chatService.getPrivateChat(this.authUserId, this.selectedUserProfileId);

    this.profileService.getProfile(this.selectedUserProfileId).subscribe(profile => {
      this.selectedUserProfile = profile;
    });
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.content.scrollToBottom(300);
   }, 1000);
  }

  async sendMessage(event: string) {

    await this.chatService.sendPrivateChat(event, this.authUserId, this.selectedUserProfileId);
    // this.contentArea.scrollToBottom(300);
    setTimeout(() => {
      this.content.scrollToBottom(300);
   }, 1000);
  }



  navigateToTabsPage() {
    this.nav.navigateRoot('/tabs');
  }

}

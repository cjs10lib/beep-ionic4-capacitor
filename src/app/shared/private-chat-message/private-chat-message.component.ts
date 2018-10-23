import { Component, Input, OnInit } from '@angular/core';

import { Profile } from '../../models/profile/profile.model';
import { ProfileService } from '../../services/profile.service';
import { PrivateMessage } from './../../models/messages/messages.model';

@Component({
  selector: 'app-private-chat-message',
  templateUrl: './private-chat-message.component.html',
  styleUrls: ['./private-chat-message.component.scss']
})
export class PrivateChatMessageComponent implements OnInit {

  @Input() message: PrivateMessage;
  @Input() authUserId: string;

  senderProfile = {} as Profile;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getProfile(this.message.from).subscribe(profile => {
      this.senderProfile = profile;
    });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { User } from 'firebase';

import { Message } from '../../../models/messages/messages.model';
import { Profile } from '../../../models/profile/profile.model';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  @Input() user: User;
  @Input() message: Message;


  senderProfile = {} as Profile;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getProfile(this.message.user).subscribe(profile => {
      this.senderProfile = profile;
    });
  }

}

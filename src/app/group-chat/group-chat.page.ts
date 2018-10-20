import { ProfileService } from './../services/profile.service';
import { User } from 'firebase';
import { AuthService } from './../services/auth.service';
import { Group } from './../models/group/group.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Observable, Subscription } from 'rxjs';
import { Message } from '../models/messages/messages.model';
import { Profile } from '../models/profile/profile.model';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.page.html',
  styleUrls: ['./group-chat.page.scss'],
})
export class GroupChatPage implements OnInit {

  user: User;
  messages$: Observable<Message[]>;


  groupId: string;
  groupProfile = {} as Group;

  subscription: Subscription[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private chatService: ChatService,
              private authService: AuthService,
              private profileService: ProfileService) { }

  ngOnInit() {
    this.groupId = this.route.snapshot.paramMap.get('id');
    this.messages$ = this.chatService.getGroupChat(this.groupId);

    this.getGroupProfile();
  }

  ionViewWillEnter() {
    this.subscription.push(this.authService.getAuthState().subscribe(user => {
      this.user = user;
    }));
  }

  ionViewWillLeave() {
    if (this.subscription.length > 0) {
      this.subscription.forEach(subscription => {
        subscription.unsubscribe();
      });
    }
  }

  getGroupProfile() {
    this.subscription.push(this.chatService.getGroup(this.groupId).subscribe(group => {
      this.groupProfile = group;
    }));
  }

  async sendMessage(event: string) {
    await this.chatService.sendGroupChat(event, this.user, this.groupId);
  }

  navigateToGroupsPage() {
    this.router.navigateByUrl('/tabs/(groups:groups)');
  }

}

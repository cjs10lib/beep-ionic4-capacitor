import { User } from 'firebase';
import { AuthService } from './../services/auth.service';
import { Group } from './../models/group/group.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Observable, Subscription } from 'rxjs';
import { Message } from '../models/messages/messages.model';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.page.html',
  styleUrls: ['./group-chat.page.scss'],
})
export class GroupChatPage implements OnInit {

  user: User;
  messages$: Observable<Message[]>;

  groupId: string;
  group = {} as Group;

  subscription: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private chatService: ChatService, private authService: AuthService) { }

  ngOnInit() {
    this.groupId = this.route.snapshot.paramMap.get('id');

    this.chatService.getGroup(this.groupId).subscribe(group => {
      this.group = group;
    });
  }

  ionViewWillEnter() {
    this.subscription = this.authService.getAuthState().subscribe(user => {
      this.user = user;
    });
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async sendMessage(event: string) {
    await this.chatService.sendGroupMessage(event, this.user, this.groupId);
  }

  navigateToGroupsPage() {
    this.router.navigateByUrl('/tabs/(groups:groups)');
  }

}

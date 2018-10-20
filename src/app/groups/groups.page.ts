import { Group } from './../models/group/group.model';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { User } from 'firebase';
import { Subscription, Observable } from 'rxjs';

import { AuthService } from './../services/auth.service';
import { ChatService } from './../services/chat.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {

  user: User;
  groups$: Observable<Group[]>;

  subscription: Subscription;

  constructor(private alert: AlertController,
              private chatService: ChatService,
              private authService: AuthService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.groups$ = this.chatService.getGroups();

    this.subscription = this.authService.getAuthState().subscribe(user => {
      this.user = user;
    });
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async showAddGroupDialog() {
    const alert = await this.alert.create({
      header: 'Group Name',
      inputs: [{
        name: 'groupName'
      }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: async data => {
            const groupExist = await this.chatService.verifyIfGroupExistGroup(data.groupName);

            if (!groupExist) {
              await this.chatService.addGroup(data.groupName, this.user);

              const response = `${data.groupName} was created sucessfully`;
              this.responseAlert(response);
            } else {
              const response = `Sorry! ${data.groupName} is not available. Try another group name`;
              this.responseAlert(response);
            }

          }
        }
      ]
    });

    alert.present();
  }

  async responseAlert(response) {
    const alert = await this.alert.create({
      header: 'Alert',
      message: response,
      buttons: ['OK']
    });

    alert.present();
  }

}

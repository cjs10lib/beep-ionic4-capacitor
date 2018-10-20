import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MessagePage } from './message.page';
import { SendMesssageBoxComponent } from './send-messsage-box/send-messsage-box.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';

const routes: Routes = [
  {
    path: '',
    component: MessagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MessagePage, SendMesssageBoxComponent, ChatMessageComponent]
})
export class MessagePageModule {}

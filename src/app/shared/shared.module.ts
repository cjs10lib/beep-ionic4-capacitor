
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendMesssageBoxComponent } from '../shared/components/send-messsage-box/send-messsage-box.component';
import { ChatMessageComponent } from '../shared/components/chat-message/chat-message.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PrivateChatMessageComponent } from './private-chat-message/private-chat-message.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [
    ChatMessageComponent,
    SendMesssageBoxComponent,
    PrivateChatMessageComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule,

    ChatMessageComponent,
    SendMesssageBoxComponent,
    PrivateChatMessageComponent
  ]
})
export class SharedModule { }

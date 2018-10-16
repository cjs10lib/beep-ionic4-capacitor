import { Message } from './../models/messages/messages.model';
import { Component, OnInit } from '@angular/core';
import { MESSAGE_LIST } from '../mocks/messages/message.mock';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {

  messages: Message[] = MESSAGE_LIST;

  constructor() { }

  ngOnInit() {
    console.log(this.messages);
  }

}

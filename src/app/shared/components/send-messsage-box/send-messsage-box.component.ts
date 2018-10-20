
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Message } from '../../../models/messages/messages.model';

@Component({
  selector: 'app-send-messsage-box',
  templateUrl: './send-messsage-box.component.html',
  styleUrls: ['./send-messsage-box.component.scss']
})
export class SendMesssageBoxComponent implements OnInit {

  @Output() sendMessage: EventEmitter<string>;

  message: string;

  constructor() {
    this.sendMessage = new EventEmitter<string>();
  }

  ngOnInit() {}

  send() {
    this.sendMessage.emit(this.message);
    this.message = '';
  }

}

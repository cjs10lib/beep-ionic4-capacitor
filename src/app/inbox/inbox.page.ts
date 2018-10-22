import { GroupMessage } from './../models/messages/messages.model';
import { Component, OnInit } from '@angular/core';
import { MESSAGE_LIST } from '../mocks/messages/message.mock';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {

  messages: GroupMessage[] = MESSAGE_LIST;

  constructor(private router: Router) { }

  ngOnInit() {
    // console.log(this.messages);
  }

  navigatetoSearchUserPage() {
    this.router.navigate(['search-user']);
  }

}

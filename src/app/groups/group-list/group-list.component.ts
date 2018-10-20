import { Group } from './../../models/group/group.model';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  @Input() group: Group;

  constructor(private router: Router) { }

  ngOnInit() { }

  openGroupChat() {
    this.router.navigate(['group-chat', this.group.uid]);
  }

}

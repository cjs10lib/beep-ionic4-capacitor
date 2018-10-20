import { Group } from './../../models/group/group.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  @Input() group: Group;

  constructor() { }

  ngOnInit() { }

}

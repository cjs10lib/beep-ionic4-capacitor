import { Component, OnInit } from '@angular/core';
import { Profile } from '../../models/profile/profile.model';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.scss']
})
export class EditProfileFormComponent implements OnInit {

  profile = {} as Profile;

  constructor() { }

  ngOnInit() {
  }

  saveProfile() { }

}

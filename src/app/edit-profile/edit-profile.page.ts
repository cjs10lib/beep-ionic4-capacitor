import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  profileId: string;

  constructor(private router: Router) { }

  ngOnInit() { }

  saveProfileResult(event: boolean) {
    event ? this.router.navigateByUrl('/tabs/(profile:profile)') : console.error('Not authenticated or saved');
  }

}

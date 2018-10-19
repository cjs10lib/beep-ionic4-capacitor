import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { Profile } from './../models/profile/profile.model';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.page.html',
  styleUrls: ['./search-user.page.scss'],
})
export class SearchUserPage implements OnInit {

  constructor(private nav: NavController) { }

  ngOnInit() { }

  openChat(event: Profile) {
    this.nav.navigateRoot('/message/' + event.uid );
  }

}

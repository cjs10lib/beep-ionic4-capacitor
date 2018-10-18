import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User;

  constructor(private nav: NavController) { }

  ngOnInit() { }

  navigateToEditProfilePage() {
    this.nav.navigateRoot(['edit-profile']);
  }

  getUser(event: User) {
    this.user = event;
  }

}

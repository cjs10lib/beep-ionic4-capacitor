import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchUserPage } from './search-user.page';
import { ProfileSearchComponent } from './profile-search/profile-search.component';

const routes: Routes = [
  {
    path: '',
    component: SearchUserPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchUserPage, ProfileSearchComponent]
})
export class SearchUserPageModule {}

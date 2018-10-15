import { ProfilePage } from './../profile/profile.page';
import { GroupsPage } from './../groups/groups.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { InboxPage } from '../inbox/inbox.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/(inbox:inbox)',
        pathMatch: 'full',
      },
      {
        path: 'inbox',
        outlet: 'inbox',
        component: InboxPage
      },
      {
        path: 'groups',
        outlet: 'groups',
        component: GroupsPage
      },
      {
        path: 'profile',
        outlet: 'profile',
        component: ProfilePage
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(inbox:inbox)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

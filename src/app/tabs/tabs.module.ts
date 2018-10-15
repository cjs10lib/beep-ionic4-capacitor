import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { GroupsPageModule } from '../groups/groups.module';
import { InboxPageModule } from './../inbox/inbox.module';
import { ProfilePageModule } from './../profile/profile.module';
import { TabsPage } from './tabs.page';
import { TabsPageRoutingModule } from './tabs.router.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,

    InboxPageModule,
    GroupsPageModule,
    ProfilePageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}

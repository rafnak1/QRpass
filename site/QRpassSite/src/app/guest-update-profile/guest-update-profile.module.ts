import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestUpdateProfilePageRoutingModule } from './guest-update-profile-routing.module';

import { GuestUpdateProfilePage } from './guest-update-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuestUpdateProfilePageRoutingModule
  ],
  declarations: [GuestUpdateProfilePage]
})
export class GuestUpdateProfilePageModule {}

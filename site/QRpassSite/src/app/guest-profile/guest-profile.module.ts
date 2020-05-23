import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestProfilePageRoutingModule } from './guest-profile-routing.module';

import { GuestProfilePage } from './guest-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuestProfilePageRoutingModule
  ],
  declarations: [GuestProfilePage]
})
export class GuestProfilePageModule {}

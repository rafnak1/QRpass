import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestRegisterPageRoutingModule } from './guest-register-routing.module';

import { GuestRegisterPage } from './guest-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuestRegisterPageRoutingModule
  ],
  declarations: [GuestRegisterPage]
})
export class GuestRegisterPageModule {}

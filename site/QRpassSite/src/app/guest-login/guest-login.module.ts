import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestLoginPageRoutingModule } from './guest-login-routing.module';

import { GuestLoginPage } from './guest-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GuestLoginPageRoutingModule
  ],
  declarations: [GuestLoginPage]
})
export class GuestLoginPageModule {}

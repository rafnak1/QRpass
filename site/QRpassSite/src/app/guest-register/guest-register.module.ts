import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestRegisterPageRoutingModule } from './guest-register-routing.module';

import { GuestRegisterPage } from './guest-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GuestRegisterPageRoutingModule
  ],
  declarations: [GuestRegisterPage]
})
export class GuestRegisterPageModule {}

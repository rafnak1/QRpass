import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestRegister2PageRoutingModule } from './guest-register2-routing.module';

import { GuestRegister2Page } from './guest-register2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GuestRegister2PageRoutingModule
  ],
  declarations: [GuestRegister2Page]
})
export class GuestRegister2PageModule {}

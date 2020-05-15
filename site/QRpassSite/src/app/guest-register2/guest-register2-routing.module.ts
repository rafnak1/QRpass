import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestRegister2Page } from './guest-register2.page';

const routes: Routes = [
  {
    path: '',
    component: GuestRegister2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestRegister2PageRoutingModule {}

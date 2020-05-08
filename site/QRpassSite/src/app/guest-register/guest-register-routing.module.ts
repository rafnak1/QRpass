import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestRegisterPage } from './guest-register.page';

const routes: Routes = [
  {
    path: '',
    component: GuestRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestRegisterPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestLoginPage } from './guest-login.page';

const routes: Routes = [
  {
    path: '',
    component: GuestLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestLoginPageRoutingModule {}

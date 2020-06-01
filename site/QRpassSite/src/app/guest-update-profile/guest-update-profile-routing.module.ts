import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestUpdateProfilePage } from './guest-update-profile.page';

const routes: Routes = [
  {
    path: '',
    component: GuestUpdateProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestUpdateProfilePageRoutingModule {}

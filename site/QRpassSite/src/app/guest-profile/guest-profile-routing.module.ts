import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestProfilePage } from './guest-profile.page';

const routes: Routes = [
  {
    path: '',
    component: GuestProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestProfilePageRoutingModule {}

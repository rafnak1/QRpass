import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaTestePage } from './pagina-teste.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaTestePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaTestePageRoutingModule {}

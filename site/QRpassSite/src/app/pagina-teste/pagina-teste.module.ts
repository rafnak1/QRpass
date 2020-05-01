import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaTestePageRoutingModule } from './pagina-teste-routing.module';

import { PaginaTestePage } from './pagina-teste.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaTestePageRoutingModule
  ],
  declarations: [PaginaTestePage]
})
export class PaginaTestePageModule {}

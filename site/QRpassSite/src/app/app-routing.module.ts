import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'pagina-teste',
    loadChildren: () => import('./pagina-teste/pagina-teste.module').then( m => m.PaginaTestePageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  { path: '', loadChildren: './cadastro/cadastro.module#CadastroPageModule' },
  { path: 'idea', loadChildren: './cadastro/cadastro.module#CadastroPageModule' },
  { path: 'idea/:id', loadChildren: './cadastro/cadastro.module#CadastroPageModule' },
  {
    path: 'guest-login',
    loadChildren: () => import('./guest-login/guest-login.module').then( m => m.GuestLoginPageModule)
  },
  {
    path: 'guest-register',
    loadChildren: () => import('./guest-register/guest-register.module').then( m => m.GuestRegisterPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  { path: '', loadChildren: './cadastro/cadastro.module#CadastroPageModule' },
  { path: 'idea', loadChildren: './cadastro/cadastro.module#CadastroPageModule' },
  { path: 'idea/:id', loadChildren: './cadastro/cadastro.module#CadastroPageModule' },
  { path: 'login', loadChildren: './guest-login/guest-login.module#GuestLoginPageModule' },
  { path: 'signup', loadChildren: './guest-register/guest-register.module#GuestRegisterPageModule' },
  { path: 'signup2', loadChildren: './guest-register2/guest-register2.module#GuestRegister2PageModule' },
  { path: 'main', loadChildren: './main/main.module#MainPageModule' },
  {
    path: 'main-menu',
    loadChildren: () => import('./main-menu/main-menu.module').then( m => m.MainMenuPageModule)
  },
  {
    path: 'guest-register2',
    loadChildren: () => import('./guest-register2/guest-register2.module').then( m => m.GuestRegister2PageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then( m => m.MainPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

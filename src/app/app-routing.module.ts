import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { ValidateLogged } from './guards/validate-logged.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./pages/clientes/clientes.module').then(m => m.ClientesPageModule),
    canActivate: [AuthGuard, ValidateLogged]
  },
  {
    path: 'equipos/:id',
    loadChildren: () => import('./pages/equipos/equipos.module').then(m => m.EquiposPageModule),
    canActivate: [ValidateLogged]
  },
  {
    path: 'historial/:id',
    loadChildren: () => import('./pages/historial/historial.module').then(m => m.HistorialPageModule),
    canActivate: [ValidateLogged]
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ClientesPage } from './pages/clientes/clientes.page';
import { EquiposPage } from './pages/equipos/equipos.page';
import { HistorialPage } from './pages/historial/historial.page';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';
import { AuthGuard } from './guards/auth.guard';
import { ValidateLogged } from './guards/validate-logged.guard';
import { HomePage } from './pages/home/home.page';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'home', component: HomePage, canActivate: [ValidateLogged] },
  { path: 'clientes', component: ClientesPage, canActivate: [AuthGuard, ValidateLogged] },
  { path: 'equipos', component: EquiposPage, canActivate:  [ValidateLogged] },
  { path: 'historial', component: HistorialPage, canActivate:  [ValidateLogged] },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }

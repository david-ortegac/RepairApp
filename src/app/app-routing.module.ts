import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ClientesPage } from './pages/clientes/clientes.page';
import { EquiposPage } from './pages/equipos/equipos.page';
import { HistorialPage } from './pages/historial/historial.page';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'clientes', component: ClientesPage, canActivate: [AuthGuard] },
  { path: 'equipos', component: EquiposPage },
  { path: 'historial', component: HistorialPage },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }

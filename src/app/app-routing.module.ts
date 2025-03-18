import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ClientesPage } from './pages/clientes/clientes.page';
import { EquiposPage } from './pages/equipos/equipos.page';
import { HistorialPage } from './pages/historial/historial.page';

const routes: Routes = [
  { path: '', redirectTo: 'clientes', pathMatch: 'full' },
  { path: 'clientes', component: ClientesPage },
  { path: 'equipos', component: EquiposPage },
  { path: 'historial', component: HistorialPage }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

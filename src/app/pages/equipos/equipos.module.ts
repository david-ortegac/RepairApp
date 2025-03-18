import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquiposPageRoutingModule } from './equipos-routing.module';

import { EquiposPage } from './equipos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquiposPageRoutingModule,
    EquiposPage
  ]
})
export class EquiposPageModule {}

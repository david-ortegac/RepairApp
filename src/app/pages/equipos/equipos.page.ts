import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { EquiposService } from 'src/app/services/equipos.service';


@Component({
  selector: 'app-equipos',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './equipos.page.html',
  styleUrls: ['./equipos.page.scss'],
})
export class EquiposPage implements OnInit {

  private readonly equipoService = inject(EquiposService);

  constructor(
    private readonly equiposService: EquiposService,
    private readonly authService: AuthService
  ) { }

  ngOnInit() {
    //this.equiposService.obtenerEquiposDeCliente
  }

  obtenerByClienteId() {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.equipoService.getEquiposDeCliente(user.uid).subscribe(equipos => {
          console.log(equipos);
        });
      }
    });
  }

}

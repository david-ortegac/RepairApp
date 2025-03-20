import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Equipo from 'src/app/models/Equipo';
import { AuthService } from 'src/app/services/auth.service';
import { ClienteService } from 'src/app/services/clientes.service';
import { EquiposService } from 'src/app/services/equipos.service';

@Component({
  selector: 'app-equipos',
  standalone: false,
  templateUrl: './equipos.page.html',
  styleUrls: ['./equipos.page.scss'],
})
export class EquiposPage implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute);

  equipos: Equipo[] = [];
  currentUserId: string = "";
  userByParams: string = "";

  constructor(
    private readonly equiposService: EquiposService,
    private readonly authService: AuthService,
    private readonly clienteService: ClienteService
  ) { }

  ngOnInit() {
    this.obtenerByClienteId();
  }

  obtenerByClienteId() {
    this.activatedRoute.params.subscribe(params => {
      this.userByParams = params['id'];
    });

    if (this.userByParams == null) {
      this.equiposService.obtenerEquipos(this.userByParams).subscribe(equipos => {
        this.equipos = equipos;
      });
    } else {
      this.authService.getCurrentUser().subscribe(user => {
        if (user) {
          this.clienteService.getIdClienteByEmail(user.email!).subscribe(cliente => {
            this.currentUserId = cliente.id!;
            this.equiposService.obtenerEquipos(cliente.id!).subscribe(equipos => {
              this.equipos = equipos;
            });
          });
        }
      });
    }
  }

  agregarEquipo() {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.clienteService.getIdClienteByEmail(user.email!).subscribe(cliente => {
          this.equiposService.agregarEquipo(cliente.id!, {
            marca: 'Lenovo',
            modelo: 'Thinkpad',
            disco: '512 GB',
            memoria: '16 GB',
            procesador: 'Intel Core i7',
            tipo: 'Laptop'
          });
        });
      }
    });
  }

}

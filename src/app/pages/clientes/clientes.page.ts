import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Cliente from 'src/app/models/Cliente';
import Equipo from 'src/app/models/Equipo';
import { ClienteService } from 'src/app/services/clientes.service';
import { EquiposService } from 'src/app/services/equipos.service';

@Component({
  selector: 'app-clientes',
  standalone: false,
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  clientes: Cliente[] = [];
  cliente: Cliente | undefined;
  clienteId: string | null = null;
  cargando: boolean = true;
  equipos: Equipo[] = [];

  constructor(
    private readonly clientesService: ClienteService,
    private readonly equiposService: EquiposService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.getClientes();
  }

  eliminarCliente(id: string) {
    this.clientesService.deleteCliente(id);
  }

  getClientes() {
    this.clientesService.obtenerClientes().subscribe(data => {
      this.clientes = data;
      this.cargando = false;
    });
  }

  getClienteById(id: string) {
    this.clientesService.getCliente(id).subscribe(res => {
      this.cliente = res;
    });
  }

  getEquipos(clienteId: string) {
    this.equiposService.obtenerEquipos(clienteId).subscribe(data => {
      this.equipos = data;
      this.router.navigate(['/equipos', clienteId]);
    });
  }

}

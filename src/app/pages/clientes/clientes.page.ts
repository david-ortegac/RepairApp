import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import Cliente from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/clientes.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import Equipo from 'src/app/models/Equipo';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, IonicModule, ProgressSpinnerModule],
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  clientes: Cliente[] = [];
  cliente: Cliente | undefined;
  clienteId: string | null = null;
  cargando: boolean = true;
  equipos: Equipo[] = [];

  constructor(private readonly clientesService: ClienteService) { }

  ngOnInit() {
    this.getClientes();
  }

  eliminarCliente(id: string) {
    this.clientesService.eliminarCliente(id);
  }

  getClientes() {
    this.clientesService.obtenerClientes().subscribe(data => {
      console.log(data);
      this.clientes = data;
      this.cargando = false;
    });
  }

  getClienteById(id: string) {
    this.clientesService.getCliente(id).subscribe(res => {
      this.cliente = res;
    });
  }

}

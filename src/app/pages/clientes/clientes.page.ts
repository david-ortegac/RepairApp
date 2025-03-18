import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule  } from '@ionic/angular';
import Cliente from 'src/app/models/Cliente';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, IonicModule, ProgressSpinnerModule],
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  clientes: Cliente[] = [];
  cargando = true;

  constructor(private readonly firebaseService: FirebaseService) { }

  ngOnInit() {
    this.getClientes();
  }

  eliminarCliente(id: string) {
    this.firebaseService.eliminarCliente(id);
  }

  getClientes() {
    this.firebaseService.obtenerClientes().subscribe(data => {
      console.log(data);
      this.clientes = data;
      this.cargando = false;
    });
  }

}

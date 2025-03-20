import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core';
import { ActivatedRoute } from '@angular/router';
import { IonModal } from '@ionic/angular';
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

  @ViewChild(IonModal) modal!: IonModal;
  name!: string;

  
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

    if (this.userByParams != undefined) {
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
    } else {
      this.equiposService.obtenerEquipos(this.userByParams).subscribe(equipos => {
        this.equipos = equipos;
      });
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    console.log('ffffff');
    if (event.detail.role === 'confirm') {
      console.log('confirm');
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

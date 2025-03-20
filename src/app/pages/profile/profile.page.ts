import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import Cliente from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  uid: string | null = null;
  cliente: Cliente | undefined;
  form: FormGroup;

  constructor(
    private readonly clienteService: ClienteService,
    private readonly afAuth: AngularFireAuth,
    private readonly toastCtrl: ToastController,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      nombre: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.uid = user.uid;
        this.clienteService.getIdClienteByEmail(user.email!).subscribe(data => {
          if (data) {
            this.cliente = data;
            this.llenarForm();
          }
        });
      }
    });
  }

  llenarForm() {
    if (this.cliente) {
      this.form.get('nombre')?.setValue(this.cliente.nombre);
      this.form.get('email')?.setValue(this.cliente.email);
      this.form.get('telefono')?.setValue(this.cliente.telefono);
      this.form.get('direccion')?.setValue(this.cliente.direccion);
    }
  }

  clienteToUpdate() {
    if (this.cliente) {
      this.cliente.nombre = this.form.get('nombre')?.value;
      this.cliente.email = this.form.get('email')?.value;
      this.cliente.telefono = this.form.get('telefono')?.value;
      this.cliente.direccion = this.form.get('direccion')?.value;
    }
  }

  async actualizarPerfil() {
    if (!this.uid) return;

    try {
      this.clienteToUpdate();
      await this.clienteService.updateCliente(this.cliente?.id!, this.cliente!);
      this.showToast('Perfil actualizado con éxito');
      this.router.navigate(['/profile']); // Redirigir al perfil
    } catch (error) {
      this.showToast('Error al actualizar el perfil', 'danger');
    }
  }

  async showToast(message: string, color: string = 'success') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
    });
    await toast.present();
  }

}

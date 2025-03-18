import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email = '';
  password = '';

  constructor(private readonly authService: AuthService, private readonly router: Router, private readonly toastCtrl: ToastController) { }

  async showToast(message: string, color: string = 'success') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
    });
    await toast.present();
  }

  async login() {
    try {
      await this.authService.loginUser(this.email, this.password);
      this.showToast('Inicio de sesión exitoso');
      this.router.navigate(['/clientes']);
    } catch (error) {
      this.showToast('Validar datos ingresados', 'danger');
    }
  }

  register() {
    this.router.navigate(['/register']);
  }

}

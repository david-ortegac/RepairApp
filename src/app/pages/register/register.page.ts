import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastCtrl: ToastController
  ) { }

  async register() {
    if (this.password !== this.confirmPassword) {
      this.showToast("Las contraseñas no coinciden", 'danger');
      return;
    }

    try {
      await this.authService.registerUser(this.email, this.password, this.name);
      this.showToast('Account created successfully');
      this.router.navigate(['/login']);
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : 'An unexpected error occurred';
      this.showToast(errorMessage, 'danger');
      console.log(errorMessage);
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  async showToast(message: string, color: string = 'success') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      color,
    });
    await toast.present();
  }
}

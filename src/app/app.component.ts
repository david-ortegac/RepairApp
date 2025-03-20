import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {

  user: User | undefined;

  public appPages = [
    { title: 'Clientes', url: '/clientes', icon: 'people' },
    { title: 'Perfil', url: '/profile', icon: 'paper-plane' },
    { title: 'Cerrar Sesion', url: '/logout', icon: 'close' }
  ];

  constructor(private readonly authService: AuthService) { }
  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.user = {
          ...user,
          email: user.email ?? ''
        } as User;
        this.appPages = [
          { title: 'Clientes', url: '/clientes', icon: 'people' },
          { title: 'Perfil', url: '/profile', icon: 'paper-plane' },
          { title: 'Cerrar Sesion', url: '/logout', icon: 'close' }
        ];
      } else {
        this.appPages = [
          { title: 'Login', url: '/login', icon: 'log-in' },
          { title: 'Registro', url: '/register', icon: 'person-add' }
        ];
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
  standalone: false
})
export class LogoutPage implements OnInit {

  constructor(private readonly authService: AuthService, private readonly router: Router) { }

  ngOnInit() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidateLogged implements CanActivate {
  private readonly sessionTimeout = 3600000; // 1 hora en milisegundos
  private sessionTimer: any;

  constructor(private readonly afAuth: AngularFireAuth, private readonly router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.afAuth.authState.pipe(
      take(1),
      switchMap(user => {
        if (!user) {
          this.router.navigate(['/login']);
          return of(false);
        }

        this.resetSessionTimer(); // 🔥 Inicia o reinicia el temporizador
        return of(true);
      })
    );
  }

  private resetSessionTimer() {
    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer);
    }

    this.sessionTimer = setTimeout(() => {
      this.afAuth.signOut().then(() => {
        this.router.navigate(['/login']);
      });
    }, this.sessionTimeout);
  }
}

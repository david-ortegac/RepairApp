import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, take, switchMap } from 'rxjs/operators';
import Cliente from '../models/Cliente';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  private readonly clientesCollection = this.firestore.collection('clientes');

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly firestore: AngularFirestore,
    private readonly router: Router
  ) { }

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.afAuth.authState.pipe(
      take(1),
      switchMap(user => {
        if (!user) {
          this.router.navigate(['/login']);
          return of(false);
        }
        return this.checkUserRole(user.email!);
      })
    );
  }

  private checkUserRole(email: string): Observable<boolean> {
    return this.clientesCollection.get().pipe(
      map(doc => {
        if (doc) {
          const prueba = doc.docs.filter(d => (d.data() as Cliente).email === email);
          const data = prueba.map(d => d.data() as Cliente);
          if (data[0]?.tipo === "A") {
            return true;
          }else if(data[0]?.tipo === "C"){
            this.router.navigate(['/equipos']);
            return false;
          }
        }
        
        return false;
      })
    );
  }
}

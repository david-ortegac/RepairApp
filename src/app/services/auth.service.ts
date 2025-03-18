import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Cliente from '../models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly clientesCollection = this.firestore.collection('clientes');

  constructor(
    private readonly afAuth: AngularFireAuth, 
    private readonly firestore: AngularFirestore
  ) { }

  // 🔹 REGISTRAR USUARIO
  async registerUser(email: string, password: string, name: string) {
    await this.afAuth.createUserWithEmailAndPassword(email, password);
    const cliente: Cliente = {
      nombre: name,
      email: email,
      telefono: '',
      direccion: '',
      tipo: 'C',
    }
    this.clientesCollection.add(cliente);
  }

  // 🔹 INICIAR SESIÓN
  async loginUser(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // 🔹 OBTENER USUARIO ACTUAL
  getCurrentUser() {
    return this.afAuth.authState;
  }

  // 🔹 CERRAR SESIÓN
  logout() {
    return this.afAuth.signOut();
  }
}

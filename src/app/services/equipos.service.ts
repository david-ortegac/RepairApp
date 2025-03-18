import { Injectable } from '@angular/core';
import Equipo from '../models/Equipo';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import Cliente from '../models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  constructor(private afs: AngularFirestore) { }

  getEquiposDeCliente(clienteId: string): Observable<Equipo[]> {
    return this.afs.collection<Cliente>('clientes').doc(clienteId)
      .collection<Equipo>('equipos').valueChanges({ idField: 'id' });
  }

  getEquipoDeCliente(clienteId: string, equipoId: string): Observable<Equipo | undefined> {
    return this.afs.collection<Cliente>('clientes').doc(clienteId)
      .collection<Equipo>('equipos').doc<Equipo>(equipoId).valueChanges();
  }
}

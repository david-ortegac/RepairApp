import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import Cliente from '../models/Cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly clientesCollection: AngularFirestoreCollection<Cliente>;
  clientes: Observable<Cliente[]>;

  constructor(private readonly firestore: AngularFirestore) {
    this.clientesCollection = this.firestore.collection<Cliente>('clientes');
    this.clientes = this.clientesCollection.valueChanges({ idField: 'id' });
  }

  // 📌 Agregar cliente
  agregarCliente(cliente: Cliente): Promise<any> {
    return this.clientesCollection.add(cliente);
  }

  // 📌 Obtener clientes
  obtenerClientes(): Observable<Cliente[]> {
    return this.clientes;
  }

  getCliente(id: string): Observable<Cliente | undefined> {
    return this.clientesCollection.doc<Cliente>(id).valueChanges();
  }

  // 📌 Actualizar cliente
  actualizarCliente(id: string, cliente: Cliente): Promise<void> {
    return this.clientesCollection.doc(id).update(cliente);
  }

  // 📌 Eliminar cliente
  eliminarCliente(id: string): Promise<void> {
    return this.clientesCollection.doc(id).delete();
  }
}

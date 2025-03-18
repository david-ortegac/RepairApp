import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private clientesCollection = this.firestore.collection('clientes');

  constructor(private firestore: AngularFirestore) {}

  // 📌 Agregar cliente
  agregarCliente(cliente: any): Promise<any> {
    return this.clientesCollection.add(cliente);
  }

  // 📌 Obtener clientes
  obtenerClientes(): Observable<any[]> {
    return this.clientesCollection.valueChanges({ idField: 'id' });
  }

  // 📌 Actualizar cliente
  actualizarCliente(id: string, cliente: any): Promise<void> {
    return this.clientesCollection.doc(id).update(cliente);
  }

  // 📌 Eliminar cliente
  eliminarCliente(id: string): Promise<void> {
    return this.clientesCollection.doc(id).delete();
  }
}

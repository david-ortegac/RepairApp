import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Cliente from '../models/Cliente';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private readonly clientesCollection = this.firestore.collection('clientes');

  constructor(private readonly firestore: AngularFirestore) {}

  // 📌 Agregar cliente
  agregarCliente(cliente: Cliente): Promise<any> {
    return this.clientesCollection.add(cliente);
  }

  // 📌 Obtener clientes
  obtenerClientes(): Observable<Cliente[]> {
    return this.clientesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Cliente;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
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

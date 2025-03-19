import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';

import Cliente from '../models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly clientesCollection;

  constructor(private readonly firestore: Firestore) {
    this.clientesCollection = collection(this.firestore, 'clientes');
  }

  // 📌 Agregar cliente
  async agregarCliente(cliente: Cliente): Promise<any> {
    await addDoc(this.clientesCollection, cliente);
  }

  // 📌 Obtener clientes
  obtenerClientes(): Observable<Cliente[]> {
    return collectionData(this.clientesCollection, { idField: 'id' }).pipe(
      map((data) => data as Cliente[])
    );
  }

  getCliente(id: string): Observable<Cliente> {
    return collectionData(this.clientesCollection, { idField: 'id' }).pipe(
      map((data) => data.find((cliente) => cliente.id === id) as Cliente)
    );
  }

  getIdClienteByEmail(email: string): Observable<Cliente> {
    return collectionData(this.clientesCollection, { idField: 'id' }).pipe(
      map((data) => data.find((cliente) => cliente["email"] === email) as Cliente)
    );
  }

  // Actualizar un cliente (Update)
  async updateCliente(id: string, cliente: Partial<Cliente>): Promise<void> {
    try {
      const clienteDoc = doc(this.firestore, `clientes/${id}`);
      await updateDoc(clienteDoc, cliente);
      console.log('Cliente actualizado con éxito');
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
    }
  }

  // Eliminar un cliente (Delete)
  async deleteCliente(id: string): Promise<void> {
    try {
      const clienteDoc = doc(this.firestore, `clientes/${id}`);
      await deleteDoc(clienteDoc);
      console.log('Cliente eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
    }
  }
}


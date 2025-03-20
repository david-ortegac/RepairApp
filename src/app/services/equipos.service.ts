import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import Cliente from '../models/Cliente';
import Equipo from '../models/Equipo';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  //private readonly equiposCollection;

  constructor(private readonly firestore: Firestore) {
  }

  obtenerEquipos(clienteId: string): Observable<Equipo[]> {
    const equiposCollection = collection(
      this.firestore,
      `clientes/${clienteId}/equipos`
    );
    return collectionData(equiposCollection, { idField: 'id' }).pipe(
      map((data) => data as Equipo[])
    );
  }

  getEquipoById(clienteId: string, equipoId: string): Observable<Equipo> {
    const equipoDoc = doc(this.firestore, `clientes/${clienteId}/equipos/${equipoId}`);
    return docData(equipoDoc, { idField: 'id' }).pipe(
      map((data) => data as Equipo)
    );
  }

  // 📌 Agregar un equipo a un cliente específico
  async agregarEquipo(clienteId: string, equipo: Equipo): Promise<void> {
    const equiposCollection = collection(
      this.firestore,
      `clientes/${clienteId}/equipos`
    );
    await addDoc(equiposCollection, equipo);
  }

  // 📌 Actualizar un cliente
  async updateCliente(id: string, cliente: Partial<Cliente>): Promise<void> {
    try {
      const clienteDoc = doc(this.firestore, `clientes/${id}`);
      await updateDoc(clienteDoc, cliente);
      console.log('Cliente actualizado con éxito');
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
    }
  }

  // 📌 Eliminar un cliente
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
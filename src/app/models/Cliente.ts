import Equipo from "./Equipo";

export default interface Cliente {
    id?: string;
    nombre: string;
    email: string;
    telefono?: string;
    direccion?: string;
    tipo: string;
    equipos?: Equipo[];
  }
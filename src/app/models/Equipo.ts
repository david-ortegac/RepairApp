import Historial from "./Historial";

export default interface Equipo {
    id?: string;
    marca?: string;
    modelo?: string;
    disco?: string;
    memoria?: string;
    procesador?: string;
    tipo?: string;
    historial?: Historial[];
  }
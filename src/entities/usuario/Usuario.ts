import { Tarea } from "@entities/tarea/Tarea";

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  tareas: Tarea[];
}
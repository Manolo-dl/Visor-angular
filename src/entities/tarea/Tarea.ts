import { Usuario } from "@entities/usuario/Usuario";

export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  completada: boolean;
  fechaLimite: string | null;
  usuario: Usuario;
}
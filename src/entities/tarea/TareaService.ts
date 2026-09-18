import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tarea } from '@entities/tarea/Tarea';
import { Observable } from 'rxjs/internal/Observable';
import { ApiClient } from '@shared/api';

@Injectable({ providedIn: 'root' })
export class TareaService {
  private readonly apiClient = inject(ApiClient);

  getTareas(): Observable<Tarea[]> {
    return this.apiClient.get<Tarea[]>('/tareas');
  }

  getTarea(id: number): Observable<Tarea> {
    return this.apiClient.get<Tarea>(`/tareas/${id}`);
  }

  crearTarea(tarea: Tarea): Observable<Tarea> {
    return this.apiClient.post<Tarea>('/tareas', tarea);
  }

  actualizarTarea(id: number, tarea: Tarea): Observable<Tarea> {
    return this.apiClient.put<Tarea>(`/tareas/${id}`, tarea);
  }

  eliminarTarea(id: number): Observable<void> {
    return this.apiClient.delete<void>(`/tareas/${id}`);
  }
}
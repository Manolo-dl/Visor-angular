import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '@entities/usuario/Usuario';
import { Observable } from 'rxjs/internal/Observable';
import { ApiClient } from '@shared/api';

@Injectable({providedIn: 'root'})
export class UsuarioService {
  private readonly apiClient = inject(ApiClient);

  getUsuarios(): Observable<Usuario[]> {
    return this.apiClient.get<Usuario[]>('/usuarios');
  }

  getUsuario(email: string): Observable<Usuario> {
    return this.apiClient.get<Usuario>(`/usuarios/${email}`);
  }

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.apiClient.post<Usuario>('/usuarios', usuario);
  }

  actualizarUsuario(email: string, usuario: Usuario): Observable<Usuario> {
    return this.apiClient.put<Usuario>(`/usuarios/${email}`, usuario);
  }

  eliminarUsuario(email: string): Observable<void> {
    return this.apiClient.delete<void>(`/usuarios/${email}`);
  }
}
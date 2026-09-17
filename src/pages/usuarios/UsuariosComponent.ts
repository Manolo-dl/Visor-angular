import { Component } from '@angular/core';
import { Usuario } from '@entities/usuario/Usuario';
import { UsuarioService } from '@entities/usuario/UsuarioService';

@Component({
    selector: 'app-usuarios',
    templateUrl: './UsuariosComponent.html'
})

export class UsuariosPageComponent {
    usuarios: Usuario[] = [];

    constructor(private usuarioService: UsuarioService) { }

    cargarUsuarios(): void {
        this.usuarioService.getUsuarios().subscribe({
            next: (usuarios) => {
                this.usuarios = usuarios;
            },
            error: (error) => {
                console.error('Error al cargar los usuarios: ', error);
            }
        });
    }

    eliminarUsuario(id: number): void {
        this.usuarioService.eliminarUsuario(id).subscribe({
            next: () => {
                this.cargarUsuarios();
            },
            error: (error) => {
                console.error('No se ha podido eliminar el usuario: ', error);
            }
        });
    }
}
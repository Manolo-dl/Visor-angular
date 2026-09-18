import { Component, inject, signal } from '@angular/core';
import { UserStore } from '@entities/usuario/UserStore';
import { Usuario } from '@entities/usuario/Usuario';
import { UsuarioService } from '@entities/usuario/UsuarioService';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-usuarios',
    templateUrl: './UsuariosComponent.html'
})
export class UsuariosPageComponent {

    readonly usuarioStore = inject(UserStore);

}
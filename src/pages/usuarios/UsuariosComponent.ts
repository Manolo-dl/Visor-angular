import { Component, inject, signal } from '@angular/core';
import { UserStore } from '@entities/usuario/UserStore';
import { ModalUsuario } from '@features/usuario/modal-usuario';

@Component({
    selector: 'app-usuarios',
    templateUrl: './UsuariosComponent.html',
    imports: [ModalUsuario]
})
export class UsuariosPageComponent {

    readonly usuarioStore = inject(UserStore);

}
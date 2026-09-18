import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { Usuario } from "./Usuario";
import { lastValueFrom } from "rxjs";
import { inject, Signal, WritableSignal } from "@angular/core";
import { UsuarioService } from "./UsuarioService";

interface UserState {
    users: Usuario[]
}

const initialState: UserState = {
    users: []
};

export const UserStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),

    withMethods((store, usuarioService= inject(UsuarioService)) => ({
        async getUsers(): Promise<void> {
            const usuarios=await lastValueFrom(usuarioService.getUsuarios());
            patchState(store, { users: usuarios });
            console.log(usuarios);
        },

        async eliminarUsuario(email: string): Promise<void> {
        try {
            await lastValueFrom(usuarioService.eliminarUsuario(email));
            patchState(store, { users: store.users().filter(user => user.email !== email) });
        } catch (error) {
            console.error('No se ha podido eliminar el usuario: ', error);
        }
            
    }
    }))


)



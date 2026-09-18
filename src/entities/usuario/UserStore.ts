import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Usuario } from "./Usuario";
import { lastValueFrom } from "rxjs";
import { computed, inject, Signal, WritableSignal } from "@angular/core";
import { UsuarioService } from "./UsuarioService";

interface UserState {
    users: Usuario[],
    seleccionado: Usuario | null
}

const initialState: UserState = {
    users: [],
    seleccionado: null
};

export const UserStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),

    withComputed((store) => ({
        modalAbierto: computed(() => store.seleccionado() !== null),
    })),

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
        },

        async actualizarUsuario(usuario: Usuario): Promise<void> {
            try {
                const actualizado = await lastValueFrom(usuarioService.actualizarUsuario(usuario));
                patchState(store, {
                    users: store.users().map(u => u.email === actualizado.email ? actualizado : u),
                    seleccionado: null,
                });
            } catch (error) {
                console.error('No se ha podido actualizar el usuario: ', error);
            }
        },

        seleccionarUsuario(usuario: Usuario): void {
            patchState(store, { seleccionado: usuario });
        },

        cerrarEdicion(): void {
            patchState(store, { seleccionado: null });
        }
    }))


)



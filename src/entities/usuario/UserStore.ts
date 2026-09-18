import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Usuario } from "./Usuario";
import { lastValueFrom } from "rxjs";
import { computed, inject, Signal, WritableSignal } from "@angular/core";
import { UsuarioService } from "./UsuarioService";

interface UserState {
    users: Usuario[],
    seleccionado: Usuario | null,
    creando: boolean
}

const initialState: UserState = {
    users: [],
    seleccionado: null,
    creando: false
};

export const UserStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),

    withComputed((store) => ({
        modalAbierto: computed(() => store.seleccionado() !== null || store.creando()),
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

        //----sin id porq se genera ya automáticamente
        async crearUsuario(usuario: Omit<Usuario, 'id' | 'tareas'>): Promise<void> {
            try {
                const nuevo = await lastValueFrom(usuarioService.crearUsuario(usuario as Usuario));
                patchState(store, { users: [...store.users(), nuevo] });
            } catch (error) {
                console.error('No se ha podido crear el usuario: ', error);
                throw error;
            }
        },

        seleccionarUsuario(usuario: Usuario): void {
            patchState(store, { seleccionado: usuario });
        },

        cerrarEdicion(): void {
            patchState(store, { seleccionado: null, creando: false });
        },

        abrirCrear(): void {
            const nuevo: Usuario = { id: 0, nombre: '', email: '', tareas: [] };
            patchState(store, { seleccionado: nuevo, creando: true });
        }
    })
)
)



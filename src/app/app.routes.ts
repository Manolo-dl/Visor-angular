import { Routes } from '@angular/router';
import { usuarioResolver } from '@entities/usuario/Usuario-resolver';
import { TareasPageComponent } from '@pages/tareas/TareasComponent';
import { UsuariosPageComponent } from '@pages/usuarios/UsuariosComponent';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/usuarios',
    pathMatch: 'full'
  },
  {
    path: 'usuarios',
    component: UsuariosPageComponent,
    resolve: {
      usuario: usuarioResolver
    }
  },
  {
    path: 'tareas',
    component: TareasPageComponent
  },
];

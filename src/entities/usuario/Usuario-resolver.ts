import type { ResolveFn } from '@angular/router';
import { UserStore } from './UserStore';
import { inject } from '@angular/core';

export const usuarioResolver: ResolveFn<void> = async () => {
  const usuarioStore = inject(UserStore);

  if (usuarioStore.users.length == 0) {
    await usuarioStore.getUsers();
  }
};

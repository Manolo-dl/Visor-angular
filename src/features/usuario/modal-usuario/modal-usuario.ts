import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserStore } from '@entities/usuario';

@Component({
  selector: 'app-modal-usuario',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-usuario.html',
})
export class ModalUsuario {
  store = inject(UserStore);
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    effect(() => {
      const usuario = this.store.seleccionado();
      if (usuario) {
        this.form = this.fb.group({
          nombre: [usuario.nombre, Validators.required],
          email: [usuario.email, [Validators.required, Validators.email]],
        });
      }
    });
  }

  guardar() {
    if (this.form.invalid) return;
    const original = this.store.seleccionado()!;
    this.store.actualizarUsuario({ ...original, ...this.form.value });
  }

  cerrar() {
    this.store.cerrarEdicion();
  }
}

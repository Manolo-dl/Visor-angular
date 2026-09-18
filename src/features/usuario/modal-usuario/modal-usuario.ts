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
      const creando = this.store.creando();
      if (usuario) {
        this.form = this.fb.group({
          nombre: [usuario.nombre, Validators.required],
          email: [usuario.email, [Validators.required, Validators.email]],
        });
      }
    });
  }

  async guardar() {
    if (this.form.invalid) return;
    const usuario = this.store.seleccionado()!;
    const datos = { ...usuario, ...this.form.value };

    if (this.store.creando()) {
      await this.store.crearUsuario({ nombre: datos.nombre, email: datos.email });
    } else {
      await this.store.actualizarUsuario(datos);
    }
    this.cerrar();
  }

  cerrar() {
    this.store.cerrarEdicion();
  }
}

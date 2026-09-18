import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsuarioService, type Usuario } from '@entities/usuario';
import { lastValueFrom } from 'rxjs';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}

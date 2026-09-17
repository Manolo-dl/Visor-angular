import { Component } from '@angular/core';
import { Tarea } from '@entities/tarea/Tarea';
import { TareaService } from '@entities/tarea/TareaService';

@Component({
    selector: 'app-tareas',
    templateUrl: './TareasComponent.html'
})

export class TareasPageComponent {
    tareas: Tarea[] = [];

    constructor(private tareaService: TareaService) { }

    cargarTareas(): void {
        this.tareaService.getTareas().subscribe({
            next: (tareas) => {
                this.tareas = tareas;
            },
            error: (error) => {
                console.error('Error al cargar las tareas: ', error);
            }
        });
    }

    eliminarTarea(id: number): void {
        this.tareaService.eliminarTarea(id).subscribe({
            next: () => {
                this.cargarTareas();
            },
            error: (error) => {
                console.error('No se pudo eliminar la tarea: ', error);
            }
        });
    }
}

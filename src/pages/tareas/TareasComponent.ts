import { Component, OnInit, signal } from '@angular/core';
import { Tarea } from '@entities/tarea/Tarea';
import { TareaService } from '@entities/tarea/TareaService';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-tareas',
    templateUrl: './TareasComponent.html'
})

export class TareasPageComponent implements OnInit {
    // tareas: Tarea[] = [];
    tareas=signal<Tarea[]>([]);

    constructor(private tareaService: TareaService) { }

    ngOnInit(): void {
        this.cargarTareas();
    }

    async cargarTareas(): Promise<void> {

        this.tareas.set(await lastValueFrom(this.tareaService.getTareas()));
        console.log(this.tareas);
        // this.tareaService.getTareas().subscribe({
        //     next: (tareas) => {
        //         this.tareas = tareas;
        //     },
        //     error: (error) => {
        //         console.error('Error al cargar las tareas: ', error);
        //     }
        // });
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

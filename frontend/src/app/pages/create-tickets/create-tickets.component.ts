import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TicketService } from 'src/app/core';
import { KeyMap } from 'src/app/core/interfaces/sidebar.links.interface';
import {
  CreateTicket,
  TicketSelect,
} from 'src/app/core/interfaces/ticket.interface';

@Component({
  selector: 'app-create-tickets',
  templateUrl: './create-tickets.component.html',
  styles: [
    `
      .grid-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin-bottom: 2rem;
      }

      label {
        width: 100%;
      }
    `,
  ],
})
export class CreateTicketsComponent {
  ticketForm: FormGroup;
  priorities: string[] = ['Alto', 'Medio', 'Bajo'];
  categories: string[] = ['Reclamo', 'Solicitud', 'Informacion'];
  status = {
    pendiente: '63ed84d64aaa4014a8cf51d7',
    enProceso: '63ed84ed4aaa4014a8cf51dc',
    completado: '63ed84fd4aaa4014a8cf51e1',
  };
  flujos = {
    compra: '63ed79a3d4ad9b0e5bce0cb7',
  };
  priorityKeys: KeyMap = {
    alto: '63ec427820604c186cadefc9',
    medio: '63ec428420604c186cadefce',
    bajo: '63ec429120604c186cadefd3',
  };
  categoryKeys: KeyMap = {
    solicitud: '63ec418483bf4769f2e184a4',
    reclamo: '63ec418483bf4769f2e184a4',
    informacion: '63ec418483bf4769f2e184a4',
  };

  constructor(private ticketService: TicketService) {
    this.ticketForm = new FormGroup({
      prioritiesSelect: new FormControl(this.priorities),
      categoriesSelect: new FormControl(this.categories),
      asunto: new FormControl(''),
      contenido: new FormControl(''),
    });
  }

  onSubmitTicket() {
    debugger;
    const ticketRequest: TicketSelect = this.ticketForm.value;
    const request: CreateTicket = this.materializeTicketRequest(ticketRequest);
    this.ticketService.createTicket(request).subscribe({
      next: (response) => console.log(response),
      error: (err) => console.log(err),
    });
  }

  materializeTicketRequest(ticket: TicketSelect): CreateTicket {
    const createTicketRequest: CreateTicket = {
      asunto: ticket.asunto,
      contenido: ticket.contenido,
      prioridad_id: this.priorityKeys[ticket.prioritiesSelect.toLowerCase()],
      categoria_id: this.categoryKeys[ticket.categoriesSelect.toLowerCase()],
      estado_id: this.status.pendiente,
      trabajo_flujo_id: this.flujos.compra,
    };
    return createTicketRequest;
  }
}

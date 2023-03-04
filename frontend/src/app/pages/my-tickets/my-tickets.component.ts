import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TicketService, UserService } from 'src/app/core';
import { ColumnTable } from 'src/app/core/interfaces/sidebar.links.interface';
import { Ticket, TicketResponse } from 'src/app/core/interfaces/ticket.interface';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styles: [
  ]
})
export class MyTicketsComponent implements OnInit {
  private tickets: Ticket[] = [];  
  get getTickets(): Ticket[] {
    return [...this.tickets];
  }
  constructor(private ticketService: TicketService, private userService:UserService, private router: Router) { }  
  columns: ColumnTable[] = [
    {
      name: 'Id',
      key: '_id',
      show: true,
      isAvailableOnCreation: true,
      isAvailableOnEdit: true,
    },
    {
      name: 'Asunto',
      key: 'asunto',
      show: true,
      isAvailableOnCreation: true,
      isAvailableOnEdit: true
    },
    {
      name: 'Contenido',
      key: 'contenido',
      show: true,
      isAvailableOnCreation: true,
      isAvailableOnEdit: true,
    },
    {
      name: 'Estado',
      key: 'estado',
      show: true,
      isAvailableOnCreation: true,
      isAvailableOnEdit: true
    },
    {
      name: 'Prioridad',
      key: 'prioridad',
      show: true,
      isAvailableOnCreation: true,
      isAvailableOnEdit: true
    },
    {
      name: 'Creador',
      key: 'creador',
      show: true,
      isAvailableOnCreation: true,
      isAvailableOnEdit: true
    },
    {
      name: 'Categoria',
      key: 'categoria',
      show: true,
      isAvailableOnCreation: true,
      isAvailableOnEdit: true
    },
    {
      name: 'Flujo',
      key: 'flujo',
      show: true,
      isAvailableOnCreation: true,
      isAvailableOnEdit: true
    },
    {
      name: 'Modificador',
      key: 'modificador',
      show: true,
      isAvailableOnCreation: true,
      isAvailableOnEdit: true
    },
    {
      name: 'Creado a',
      key: 'creado_a',
      show: true,
      isAvailableOnCreation: true,
      isAvailableOnEdit: true
    },
    {
      name: 'Actualizado a',
      key: 'actualizado_a',
      show: true,
      isAvailableOnCreation: true,
      isAvailableOnEdit: true
    },
  ];
  
  ngOnInit(): void {
    this.userService.populate();
    this.ticketService.getTickets().subscribe({
      next: (response) => {
        this.tickets = this.materializeResponseToTicket(response);        
      }
    });
  }

  redirect(ticket: Ticket){
    this.router.navigate(['/tickets'],{queryParams: { ticketId: ticket._id }});
  }

  materializeResponseToTicket(response:TicketResponse[]){
    const tickets: Ticket[] = [];
    response.forEach((ticketResponse: TicketResponse) => {
      const ticket: Ticket = {
        _id: ticketResponse._id,
        asunto: ticketResponse.asunto,
        contenido: ticketResponse.contenido,
        estado: ticketResponse.estado_id.nombre,
        prioridad: ticketResponse.prioridad_id.nombre,
        creador: ticketResponse.creador_id.nombres + ' ' + ticketResponse.creador_id.apellidos,
        categoria: ticketResponse.categoria_id.nombre,
        flujo: ticketResponse.trabajo_flujo_id.nombre,
        modificador: ticketResponse.modificador_id?.email ?? '',
        creado_a: new Date(ticketResponse.creado_a).toLocaleDateString('es-ES'),
        actualizado_a: new Date(ticketResponse.actualizado_a).toLocaleDateString('es-ES')
      };
      tickets.push(ticket);
    });
    return tickets;
  }
}

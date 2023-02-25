import { Component, OnInit } from '@angular/core';
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
  constructor(private ticketService: TicketService, private userService:UserService) { }  
  columns: ColumnTable[] = [
    {
      name: 'Id',
      key: '_id'
    },
    {
      name: 'Asunto',
      key: 'asunto'
    },
    {
      name: 'Contenido',
      key: 'contenido'
    },
    {
      name: 'Estado',
      key: 'estado'
    },
    {
      name: 'Prioridad',
      key: 'prioridad'
    },
    {
      name: 'Creador',
      key: 'creador'
    },
    {
      name: 'Categoria',
      key: 'categoria'
    },
    {
      name: 'Flujo',
      key: 'flujo'
    },
    {
      name: 'Modificador',
      key: 'modificador'
    },
    {
      name: 'Creado a',
      key: 'creado_a'
    },
    {
      name: 'Actualizado a',
      key: 'actualizado_a'
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
        creado_a: ticketResponse.creado_a,
        actualizado_a: ticketResponse.actualizado_a
      };
      tickets.push(ticket);
    });
    return tickets;
  }
}

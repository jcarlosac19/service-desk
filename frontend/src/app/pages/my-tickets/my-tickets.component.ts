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
      key: '_id',
      show: true,
      routeLink: ['/tickets']
    },
    {
      name: 'Asunto',
      key: 'asunto',
      show: true,
    },
    {
      name: 'Contenido',
      key: 'contenido',
      show: true,
    },
    {
      name: 'Estado',
      key: 'estado',
      show: true,
    },
    {
      name: 'Prioridad',
      key: 'prioridad',
      show: true,
    },
    {
      name: 'Creador',
      key: 'creador',
      show: true,
    },
    {
      name: 'Categoria',
      key: 'categoria',
      show: true,
    },
    {
      name: 'Flujo',
      key: 'flujo',
      show: true,
    },
    {
      name: 'Modificador',
      key: 'modificador',
      show: true,
    },
    {
      name: 'Creado a',
      key: 'creado_a',
      show: true,
    },
    {
      name: 'Actualizado a',
      key: 'actualizado_a',
      show: true,
    },
  ];
  
  ngOnInit(): void {
    this.userService.populate();
    this.ticketService.getTickets().subscribe({
      next: (response) => {
        this.tickets = this.ticketService.materializeResponseToTicket(response);        
      }
    });
  }

  
}

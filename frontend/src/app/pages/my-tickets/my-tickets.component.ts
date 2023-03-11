import { Component, OnInit } from '@angular/core';
import { TicketService, UserService } from 'src/app/core';
import { ColumnTable } from 'src/app/core/interfaces/sidebar.links.interface';
import { Status } from 'src/app/core/interfaces/status.interface';
import { Ticket } from 'src/app/core/interfaces/ticket.interface';
import { StatusService } from 'src/app/core/services/status.service';
import * as helper from '../../core/helpers';

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
  
  statuses: Status[] = [];
  selectedStatus: Status = {} as Status;

  constructor(private ticketService: TicketService, private userService:UserService, private status: StatusService) { }  
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
      name: 'Creado',
      key: 'creado_a',
      show: true,
    }
  ];
  
  ngOnInit(): void {
    this.userService.populate();
    this.fetchTickets();
    this.status.getStatuses().subscribe({
      next: (response) => {
        this.statuses= this.status.materializeStatus(response);
      }
    })
  }
  fetchTickets(): void {
    this.ticketService.getTickets().subscribe({
      next: (response) => {
        this.tickets = this.ticketService.materializeResponseToTicket(response);        
      }
    });
  }

  filterByStatus() : Ticket[] {
    if(!helper.isFullObjectAndValue(this.selectedStatus) 
      || helper.isNullOrUndefined(this.selectedStatus)) {
        return [...this.getTickets];
      }
    return [...this.getTickets.filter(ticket => ticket.estado === this.selectedStatus.nombre)];
  } 
}

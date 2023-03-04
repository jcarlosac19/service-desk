import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService, UserService } from 'src/app/core';
import { ColumnTable } from 'src/app/core/interfaces/sidebar.links.interface';
import { Ticket, TicketResponse } from 'src/app/core/interfaces/ticket.interface';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  public ticket: Ticket;  
  get getTicket(): Ticket {
    return this.ticket;
  }

  private ticketId: number;

  constructor(private ticketService: TicketService, private userService:UserService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.ticketId = params['ticketId']
    })
   }  
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
    this.ticketService.getTicketById(this.ticketId).subscribe({
      next: (response) => {
        this.ticket = this.materializeResponseToTicket(response);        
      }

      
    });
  }

  materializeResponseToTicket(ticketResponse:TicketResponse){
      const ticket_: Ticket = {
        _id: ticketResponse._id,
        asunto: ticketResponse.asunto,
        contenido: ticketResponse.contenido,
        estado: ticketResponse.estado_id.nombre,
        prioridad: ticketResponse.prioridad_id.nombre,
        creador: ticketResponse.creador_id.nombres.split(" ",1) + ' ' + ticketResponse.creador_id.apellidos.split(" ",1),
        categoria: ticketResponse.categoria_id.nombre,
        flujo: ticketResponse.trabajo_flujo_id.nombre,
        modificador: ticketResponse.modificador_id?.email ?? '',
        creado_a: new Date(ticketResponse.creado_a).toLocaleDateString('es-ES'),
        actualizado_a: new Date(ticketResponse.actualizado_a).toLocaleDateString('es-ES'),
      };

    return ticket_;
  }
}

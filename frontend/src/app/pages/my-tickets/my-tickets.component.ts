import { Component, OnInit } from '@angular/core';
import { TicketService, UserService } from 'src/app/core';
import { KeyMap } from 'src/app/core/interfaces/sidebar.links.interface';
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
  columns: string[] = [];
  constructor(private ticketService: TicketService, private userService:UserService) { }  
  
  ngOnInit(): void {
    this.userService.populate();
    this.ticketService.getTickets().subscribe({
      next: (response) => {debugger;
        this.tickets = this.materializeResponseToTicket(response);
        this.columns = Object.keys(this.tickets[0]);
      }
    });
  }


  materializeResponseToTicket(response:TicketResponse[]){
    const tickets: Ticket[] = [];
    response.forEach((ticketResponse: TicketResponse) => {
      const ticket: Ticket = {
        id: ticketResponse._id,
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
  materializeTableData(): KeyMap[] {
    const tableData: KeyMap[] = [];
    this.tickets.forEach((ticket: Ticket) => {debugger;
      const ticketData: KeyMap = {};
      for (let key in ticket) {
        ticketData[key] = ticket[key];
      }
      tableData.push(ticketData);
    });
    return tableData;
  }
}

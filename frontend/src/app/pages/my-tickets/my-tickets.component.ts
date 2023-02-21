import { Component, OnInit } from '@angular/core';
import { TicketService, UserService } from 'src/app/core';
import { TicketGetResponse } from 'src/app/core/interfaces/ticket.interface';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styles: [
  ]
})
export class MyTicketsComponent implements OnInit {
  tickets: TicketGetResponse[] = [];
  constructor(private ticketService: TicketService, private userService:UserService) { }

  ngOnInit(): void {debugger;
    this.userService.populate();
    this.ticketService.getTickets().subscribe({
      next: (response) => {debugger;
        this.tickets = response;
      }
    });
  }
}

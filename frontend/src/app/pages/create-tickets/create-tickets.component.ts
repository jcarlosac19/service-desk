import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { CreateTicket } from 'src/app/core/interfaces/ticket.interface';

@Component({
  selector: 'app-create-tickets',
  templateUrl: './create-tickets.component.html',
  styles: [`
    .grid-container  {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-bottom: 2rem
    }

    label {
      width: 100%
    }
  `]
})
export class CreateTicketsComponent {
  ticketForm: FormGroup;
  priorities: string[] = ['Alto', 'Medio', 'Bajo'];
  categories: string[] = ['Reclamo', 'Solicitud', 'Informacion'];

  constructor(){
    this.ticketForm = new FormGroup({
      prioritiesSelect: new FormControl(this.priorities),
      categoriesSelect: new FormControl(this.categories),
      asunto: new FormControl(''),
      contenido: new FormControl(''),
    });
  }

  onSubmitTicket(){
    const ticketRequest: CreateTicket = this.ticketForm.value;
    console.log(ticketRequest);
  }
}

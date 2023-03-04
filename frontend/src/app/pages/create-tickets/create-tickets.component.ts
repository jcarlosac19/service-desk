import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TicketService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';
import {
  CreateTicket,
  TicketPostResponse,
  TicketSelect,
} from 'src/app/core/interfaces/ticket.interface';
import { StatusService } from 'src/app/core/services/status.service';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Status } from 'src/app/core/interfaces/status.interface';
import { status } from '../estados/constant';
import { PriorityService } from 'src/app/core/services/priority.service';
import { Priority } from 'src/app/core/interfaces/priority.interface';
import { Category } from 'src/app/core/interfaces/categories.interface';
import { Flujo } from 'src/app/core/interfaces/flujo.interface';
import { FlujoService } from 'src/app/core/services/flujo.service';

@Component({
  selector: 'app-create-tickets',
  templateUrl: './create-tickets.component.html',
  styles: [
    `
      .grid-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.2rem;
      }

      .select-style {
        width: 100%;
        margin-top: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #fff;
        color: #000;
        font-size: 1rem;
        height: 1.8rem;
        cursor: pointer;
        box-shadow: -7px 4px 11px 2px rgb(0 0 0 / 5%);
      }

      .select-style:focus {
        border: 1px solid #aaa;
        box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
        box-shadow: 0 0 0 3px -moz-mac-focusring;
        color: #000;
        outline: none;
      }
      input[type='text'] {
        
        box-shadow: -7px 4px 11px 2px rgb(0 0 0 / 5%);
      }
      textarea {
        box-shadow: -7px 4px 11px 2px rgb(0 0 0 / 5%);
      }

      .form-style {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        box-shadow: -6px 9px 18px 0px rgba(75,75,75,0.52);
        -webkit-box-shadow: -6px 9px 18px 0px rgba(75,75,75,0.52);
        -moz-box-shadow: -6px 9px 18px 0px rgba(75,75,75,0.52);
        padding: 1rem;
        border-radius: 4px;

      }

      label {
        width: 100%;
        font-size: 1.2rem;
        font-weight: 600;
      }
    `,
  ],
})
export class CreateTicketsComponent {
  ticketForm: FormGroup;
  

  categories: string[] = [];
  categoryKeys: Category[] = [];

  ticketResponse: TicketPostResponse = {} as TicketPostResponse;
  status: Status[] = [];

  priorities: string[] = [];
  priorityKeys: Priority[] = [];
  
  flujos: string[] = [];
  flujoKeys: Flujo[] = [];

  constructor(
    private ticketService: TicketService,
    private toastr: ToastrService,
    private statusService: StatusService,
    private priorityService: PriorityService,
    private categoryService: CategoriesService,
    private flujoService: FlujoService
  ) {
    this.ticketForm = new FormGroup({
      prioritiesSelect: new FormControl(this.priorities),
      categoriesSelect: new FormControl(this.categories),
      flujosSelect: new FormControl(this.flujos),
      asunto: new FormControl(''),
      contenido: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.statusService.getStatuses().subscribe({
      next: (response) => {
        this.status = this.statusService.materializeStatus(response);
      },
    });

    this.priorityService.getPriorities().subscribe({
      next: (response) => {
        this.priorityKeys =
          this.priorityService.materializePriorities(response);
          this.priorities = this.priorityKeys.map((p) => p.nombre);
      },
    });

    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categoryKeys = this.categoryService.materializeCategories(response);
          this.categories = this.categoryKeys.map((c) => c.nombre);
      },
    });

    this.flujoService.getFlujos().subscribe({
      next: (response) => {
        this.flujoKeys = this.flujoService.materializeFlujos(response);
        this.flujos = this.flujoKeys.map((c) => c.nombre);
      },
    });
  }

  onSubmitTicket() {
    const ticketRequest: TicketSelect = this.ticketForm.value;
    console.log(ticketRequest);
    const request: CreateTicket = this.materializeTicketRequest(ticketRequest);
    this.ticketService.createTicket(request).subscribe({
      next: (response) => {
        this.ticketResponse = response;
        this.toastr.success(this.ticketResponse?.message, 'Ticket creado');
        this.ticketForm.reset();
      },
      error: (err) => {
        this.toastr.error(err?.message, 'Error al crear ticket');
        this.ticketForm.reset();
      },
    });
  }

  materializeTicketRequest(ticket: TicketSelect): CreateTicket {
    const createTicketRequest: CreateTicket = {
      asunto: ticket.asunto,
      contenido: ticket.contenido,
      prioridad_id: this.priorityKeys.find((p) => p.nombre == ticket.prioritiesSelect)?._id!,
      categoria_id: this.categoryKeys.find((c) => c.nombre == ticket.categoriesSelect )?._id!,
      estado_id: this.status.find((s) => s.nombre == status.pending)?._id!,
      trabajo_flujo_id: this.flujoKeys.find((f) => f.nombre == ticket.flujosSelect)?._id!
    };
    return createTicketRequest;
  }
}

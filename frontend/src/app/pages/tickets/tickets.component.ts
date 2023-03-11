import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TicketService, UserService } from 'src/app/core';
import {
  CommentCreate,
  CommentResponse,
} from 'src/app/core/interfaces/comment.interface';
import {
  HistoryResponse,
  Ticket,
  TicketResponse,
  TicketPostResponse, 
  UpdateTicketStatus,
  historyRequest,
  HistoryTable
} from 'src/app/core/interfaces/ticket.interface';
import { CommentService } from 'src/app/core/services/comment.service';
import { FlujoService } from 'src/app/core/services/flujo.service';
import { HistoryTicketsService } from 'src/app/core/services/history-tickets.service';
import { Flujo } from 'src/app/core/interfaces/flujo.interface';
import { DepartmentsService } from 'src/app/core/services/departments.service';
import { Department } from 'src/app/core/interfaces/department.interface';
import { GetAllUserResponse } from 'src/app/core/interfaces/user.interface';
import * as helper from '../../core/helpers';
import { Status } from 'src/app/core/interfaces/status.interface';
import { StatusService } from 'src/app/core/services/status.service';
import { ColumnTable } from 'src/app/core/interfaces/sidebar.links.interface';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  ticket: Ticket = {} as Ticket;
  comments: CommentResponse[] = [];
  comment: string = '';
  showReasignModal: boolean = false;
  showHistoryModal: boolean = false;
  showChangeStatusModal: boolean = false;
  history: HistoryResponse[] = [];
  historyTable: HistoryTable[] = []
  flujos: Flujo[] = [];
  Departments: Department[]= [];
  selectedDepartment: Department = {} as Department;

  selectedStatus: Status = {} as Status;

  selectedFlujo: Flujo = {} as Flujo;
  selectedHistory: HistoryResponse = {} as HistoryResponse;
  Users: GetAllUserResponse[] = []

  statuses: Status[] = [];

  selectedUser: GetAllUserResponse = {} as GetAllUserResponse;

  ticketPadded: string = '';
  ticketResponse: TicketPostResponse = {} as TicketPostResponse;
  ticketStatusColor: string = '';
  columns: ColumnTable[] = [
    {
      name: 'Ticket Id',
      key: 'ticket_id',
      show: true,
    },
    {
      name: 'Departamento',
      key: 'departamento_id',
      show: true,
    },
    {
      name: 'Creador',
      key: 'creador_id',
      show: false,
    },
    {
      name: 'Completado',
      key: 'completado_a',
      show: false,
    },
    {
      name: 'Asignado',
      key: 'asignado_id',
      show: true,
    },
    {
      name: 'Modificador',
      key: 'modificador_id',
      show: false,
    },
    {
      name: 'Creado',
      key: 'creado_a',
      show: true,
    },
    {
      name: 'Actualizado',
      key: 'actualizado_a',
      show: true,
    },
    {
      name: 'Tiempo Estimado Resolucion',
      key: 'tiempoEstimadoResolucion',
      show: false,
    },
    {
      name: 'Tiempo Real Resolucion',
      key: 'tiempoRealResolucion',
      show: true,
    }
  ];

  get getHistory(): HistoryTable[] {
    return [...this.historyTable];
  }

  constructor(
    private ticketService: TicketService,
    private commentService: CommentService,
    private flujoService: FlujoService,
    private historyService: HistoryTicketsService,
    private departmentServices: DepartmentsService,
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private statusService: StatusService
  ) {
    this.statusService.getStatuses().subscribe(estados=>{
      this.statuses = this.statusService.materializeStatus(estados);
    });
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.ticketService.getTicketById(params['id']).subscribe((ticket) => {
        this.ticketStatusColor = ticket.estado_id.color || '';
        this.ticket = this.ticketService.materializeResponseToTicketById(ticket);
        this.ticketPadded = (this.ticket._id.toString()).padStart(5,"0")
      });
      this.commentService
        .getCommentsByTicketId(params['id'])
        .subscribe((comments) => {
          this.comments = comments;
        });
      this.historyService.getHistoryByTicket(parseInt(params['id'])).subscribe((history) => {
        this.history = history;
      });
    });

    this.flujoService.getFlujos().subscribe((flujos) => {
      this.flujos = this.flujoService.materializeFlujos(flujos);
    });
    this.departmentServices.getDepartments().subscribe((departments) => {
      this.Departments = this.departmentServices.materializeResponseToDepartments(departments);
    });
    this.userService.getAllUsers().subscribe((users) => {
      this.Users = users;
    });
  }

  showHistoryTicket() {
    this.historyService.getHistoryByTicket(this.ticket._id).subscribe((history) => {
      this.historyTable = this.historyService.assignTimeResolution(history, this.flujos, this.ticket);
      this.showHistoryModal = true;
    });
  }

  filteredColums(){
    return this.columns.filter((column: ColumnTable) => column.show);
  }

  onSubmitComment(event: any) {
    event.preventDefault();
    const request: CommentCreate = {
      asunto: this.ticket.asunto,
      contenido: this.comment,
      ticket: this.ticket._id,
    };
    this.commentService.createComment(request).subscribe((comment) => {
      this.toastr.success(comment.message, 'Exito');
      this.comments = comment.comentario;
      this.comment = '';
    });
  }

  onShowReasignModal():void{
    this.showReasignModal = true;
  }

  async onReasignTicket() {

    const isSelectedDepartment = this.selectedDepartment != undefined;

    const request: historyRequest = {
      ticket_id: this.ticket._id,
      departamento_id: this.getDepartmentId(isSelectedDepartment),
      asignado_id: this.selectedUser._id,
    };

    if (!isSelectedDepartment) {
      this.historyService.reasignTicketToUser(request).subscribe((response) => {
        this.toastr.success(response.message, 'Exito');
        this.showReasignModal = false;
      });
      return;
    }

    if (!helper.isFullObjectAndValue(request)) return;
    this.historyService.completeTicketActivity(this.ticket._id).subscribe((res) => {
      this.showReasignModal = false;

      this.historyService.crearNuevaActividad(request).subscribe((response) => {
        this.toastr.success(response.message, 'Exito');
        this.showReasignModal = false;
      });

    });
  }

  // Tabla Historico:
  // Reasignar el ticket: assignee_id, usamos un put, no agregamos registro. No se crea nuevo registro.
  // Reasignar el ticket: department_id, 
  //     * Completar el registro anterior, con la funcion completeTicketActivity
  //     * Crear el nuevo registro con el nuevo departamento con la funcion en la ruta post | historico/

  getDepartmentId(isSelectedDepartment: boolean):string{
    if(!isSelectedDepartment){
      const historyCopy = [...this.history];
      const getDepartmentDefault = historyCopy.filter(h => h.ticket_id._id === this.ticket._id)
        .sort((a,b) => a.actualizado_a > b.actualizado_a ? -1 : 1)
        .reverse()[0]?.departamento_id._id;

      return getDepartmentDefault;
    }
    return this.selectedDepartment._id;
  }


onStatusChangeTicket():void{
  let update: UpdateTicketStatus = {
    estado_id: this.selectedStatus._id
  }
  if(this.selectedStatus.nombre === 'Completado' ){
    this.historyService.completeTicketActivity(this.ticket._id).subscribe({
      next: (response) => {
        this.toastr.success(response.message, 'Ticket cerrado'); 
      },
      error: (err) => this.toastr.error(err?.message, 'Error al cerrar ticket')
    });
  }
  this.ticketService.updateTicket(this.ticket._id, update)
  .subscribe({
    next: (response) => {
      this.ticketResponse = response;
      this.toastr.success(this.ticketResponse?.message, 'Ticket creado');
      this.ticket.estado = this.selectedStatus.nombre;
      this.ticketStatusColor = this.selectedStatus.color;
      this.showChangeStatusModal = false;
    },
    error: (err) => {
      this.toastr.error(err?.message, 'Error al crear ticket');
      this.showChangeStatusModal = false;
    },
  });
}

onShowStatusChangeModal():void{
  this.showChangeStatusModal = true;
}

  getDateCreatorJoined(): string {
    const names = this.ticket?.creador?.split(' ');
    if(helper.isNullOrWhitespace(names)) return ''; 
    const users = this.Users?.find(user => names.includes(user.nombres) || names.includes(user.apellidos));
    return new Date(users?.creado_a!).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric'});
  }

}

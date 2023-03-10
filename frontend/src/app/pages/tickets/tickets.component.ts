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
  UpdateTicketStatus
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

  showChangeStatusModal: boolean = false;
  history: HistoryResponse[] = [];
  flujos: Flujo[] = [];
  Departments: Department[]= [];
  selectedDepartment: Department = {} as Department;

  selectedStatus: string;

  selectedFlujo: Flujo = {} as Flujo;
  selectedHistory: HistoryResponse = {} as HistoryResponse;
  Users: GetAllUserResponse[] = []

  statuses: Status[] = [];

  selectedUser: GetAllUserResponse = {} as GetAllUserResponse;

  ticketPadded: string = '';
  ticketResponse: TicketPostResponse = {} as TicketPostResponse;

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
        console.log(this.history);
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

  getTicketNumber(){
    
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

  onReasignTicket(){
    const request = {
      ticket_id: this.ticket._id,
      departamento_id: this.selectedDepartment._id,
      asignado_id: this.selectedUser._id,
      flujoId: this.flujos.find(f => f.nombre === this.ticket.flujo)
  };debugger;
  if(!helper.isFullObjectAndValue(request)) return;
  this.historyService.updateHistory(request).subscribe((response) => {
    this.toastr.success(response.message, 'Exito');
    this.showReasignModal = false;
  });
}


onStatusChangeTicket():void{

  console.log(this.selectedStatus)

  let update: UpdateTicketStatus = {
    estado_id: this.selectedStatus
  }
  this.ticketService.updateTicket(this.ticket._id, update)
  .subscribe({
    next: (response) => {
      this.ticketResponse = response;
      this.toastr.success(this.ticketResponse?.message, 'Ticket creado');
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


}

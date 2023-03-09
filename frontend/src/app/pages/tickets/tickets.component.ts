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
} from 'src/app/core/interfaces/ticket.interface';
import { CommentService } from 'src/app/core/services/comment.service';
import { FlujoService } from 'src/app/core/services/flujo.service';
import { HistoryTicketsService } from 'src/app/core/services/history-tickets.service';
import { Flujo } from 'src/app/core/interfaces/flujo.interface';
import { DepartmentsService } from 'src/app/core/services/departments.service';
import { Department } from 'src/app/core/interfaces/department.interface';
import { GetAllUserResponse } from 'src/app/core/interfaces/user.interface';

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
  history: HistoryResponse[] = [];
  flujos: Flujo[] = [];
  Departments: Department[]= [];
  selectedDepartment: Department = {} as Department;
  selectedFlujo: Flujo = {} as Flujo;
  selectedHistory: HistoryResponse = {} as HistoryResponse;
  Users: GetAllUserResponse[] = []
  selectedUser: GetAllUserResponse = {} as GetAllUserResponse;

  ticketPadded: string = '';

  constructor(
    private ticketService: TicketService,
    private commentService: CommentService,
    private flujoService: FlujoService,
    private historyService: HistoryTicketsService,
    private departmentServices: DepartmentsService,
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

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
    this.departmentServices.getDepartments().subscribe((departments) => {debugger;
      this.Departments = departments;
      console.log(this.Departments);
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

  }     
}

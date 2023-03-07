import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TicketService } from 'src/app/core';
import {
  CommentCreate,
  CommentResponse,
} from 'src/app/core/interfaces/comment.interface';
import {
  HistoryResponse,
  Ticket,
} from 'src/app/core/interfaces/ticket.interface';
import { CommentService } from 'src/app/core/services/comment.service';

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
  selectedHistory: HistoryResponse = {} as HistoryResponse;

  constructor(
    private ticketService: TicketService,
    private commentService: CommentService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.ticketService.getTicketById(params['id']).subscribe((ticket) => {
        this.ticket =
          this.ticketService.materializeResponseToTicketById(ticket);
      });
      this.commentService
        .getCommentsByTicketId(params['id'])
        .subscribe((comments) => {
          this.comments = comments;
        });
    });
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

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReportRequest, ReportResponse } from 'src/app/core/interfaces/report.interface';
import { ColumnTable } from 'src/app/core/interfaces/sidebar.links.interface';
import { HistoryTicketsService } from 'src/app/core/services/history.tickets.service';

@Component({
  selector: 'app-reporting',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent {
  columns: ColumnTable[] = [];
  dateStart: Date;
  dateEnd: Date;
  data: ReportResponse[] = [];
  constructor(private historyService: HistoryTicketsService, private toastrt: ToastrService) {
    this.columns = [
      {
        name: 'Ticket Id',
        key: 'ticketId',
        show: true,
        width: '50px'
      },
      {
        name: 'Email Creador',
        key: 'email_creador',
        show: true,
        width: '150px'
      },
      {
        name: 'Asignado',
        key: 'asignado',
        show: true,
      },
      {
        name: 'Creado',
        key: 'creado_a',
        show: true,
      },
      {
        name: 'Completado',
        key: 'compleado_a',
        show: true,
      },
      {
        name: 'Tiempo Estimado Resolucion',
        key: 'tiempoEstimadoResolucion',
        show: true,
        width: '170px'
      },
      {
        name: 'Tiempo Real Resolucion',
        key: 'tiempoRealResolucion',
        show: true,
        width: '150px'
      },
      {
        name: 'SLA',
        key: 'percentageSLA',
        show: true,
        width: '77px'
      }
    ];
  }

  filterColumnsTable():ColumnTable[]{
    return this.columns.filter((column: ColumnTable) => column.show);
  }
  
  onGenerateReport(event: any) {
    event.preventDefault();
    const reportRequest: ReportRequest = {
      dateStart: this.dateStart,
      dateEnd: this.dateEnd
    };
    this.historyService.getReportTickets(reportRequest).subscribe({
      next: (response: ReportResponse[]) => {
        this.data = response;
      },
      error: (error: any) => {
        this.toastrt.error(error, 'Error');
      }
    })
  }


}

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
  dateStart: Date;
  dateEnd: Date;
  data: ReportResponse[] = [];
  dataByDepto: ReportResponse[] = [];
  constructor(private historyService: HistoryTicketsService, private toastrt: ToastrService) {}

  onGenerateReport(event: any) {
    event.preventDefault();
    const reportRequest: ReportRequest = {
      dateStart: this.dateStart,
      dateEnd: this.dateEnd
    };
    this.historyService.getReportTickets(reportRequest).subscribe({
      next: (response: ReportResponse[]) => this.data = response,
      error: (error: any) => this.toastrt.error('', 'Error')
    })
    this.historyService.getReportTicketsByDepto(reportRequest).subscribe({
      next: (response: ReportResponse[]) => this.dataByDepto = response,
      error: (error: any) => this.toastrt.error('', 'Error')
    });
  }
}

import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReportRequest, ReportResponse } from 'src/app/core/interfaces/report.interface';
import { HistoryTicketsService } from 'src/app/core/services/history.tickets.service';
import { Subscription, forkJoin } from 'rxjs';
import { LoadingService } from 'src/app/shared/loading';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css'],
})
export class ReportingComponent {
  private destroySubscription$: Subscription;
  dateStart: Date;
  dateEnd: Date;
  data: ReportResponse[] = [];
  dataByDepto: ReportResponse[] = [];
  constructor(
    private historyService: HistoryTicketsService,
    private toastrt: ToastrService,
    private loadingService: LoadingService,

  ) {}

  onGenerateReport(event: any) {
    event.preventDefault();
    this.loadingService.setLoading(true);
    const reportRequest: ReportRequest = {
      dateStart: this.dateStart,
      dateEnd: this.dateEnd,
    };
    const reportTickets$ = this.historyService.getReportTickets(reportRequest);
    const reportTicketsByDepto$ =
      this.historyService.getReportTicketsByDepto(reportRequest);

    this.destroySubscription$ = forkJoin([
      reportTickets$,
      reportTicketsByDepto$,
    ]).subscribe(
      {
        next: ([reportTicketsResponse, reportTicketsByDeptoResponse]) => {
          this.data = reportTicketsResponse;
          this.dataByDepto = reportTicketsByDeptoResponse;
          this.loadingService.setLoading(false);
        },
        error: (error) => {this.toastrt.error('No se pudieron cagar los datos', 'Error'); this.loadingService.setLoading(false); }
      }
    );
  }

  ngOnDestroy() {
    this.destroySubscription$.unsubscribe();
  }
}

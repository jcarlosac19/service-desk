import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { CreateTicketsComponent } from './create-tickets/create-tickets.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';


@NgModule({
  declarations: [
    CreateTicketsComponent,
    MyTicketsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }

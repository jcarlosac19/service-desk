import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { CreateTicketsComponent } from './create-tickets/create-tickets.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { GroupsComponent } from './groups/groups.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PrioridadesComponent } from './prioridades/prioridades.component';
import { StatusComponent } from './estados/status.component';
import { CategoriesComponent } from './categories/categories.component';
import { FlujosComponent } from './flujos/flujos.component';

@NgModule({
  declarations: [
    CreateTicketsComponent,
    MyTicketsComponent,
    GroupsComponent,
    PrioridadesComponent,
    StatusComponent,
    CategoriesComponent,
    FlujosComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    DialogModule,
    ButtonModule
  ]
})
export class PagesModule { }

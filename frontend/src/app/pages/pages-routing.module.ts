import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTicketsComponent } from './create-tickets/create-tickets.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';

const routes: Routes = [
  { 
    path: 'create-tickets', 
    component: CreateTicketsComponent
  },
  { 
    path: 'my-tickets', 
    component: MyTicketsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

import { Component } from '@angular/core';
import { SidebarLinks } from 'src/app/core/interfaces/sidebar.links.interface';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  links: SidebarLinks[] = [
    {
      name: 'Tickets',
      routerName: '/my-tickets',
      icon: PrimeIcons.TICKET
    },
    {
      name: 'Create Tickets',
      routerName: '/create-tickets',
      icon: PrimeIcons.PLUS_CIRCLE
    },
    {
      name: 'Grupo',
      routerName: '/groups',
      icon: 'fa fa-users'
    },
    {
      name: 'Categorias',
      routerName: '/category',
      icon: 'fa fa-cogs'
    },
    {
      name: 'Flujos',
      routerName: '/flujos',
      icon: 'fa fa-sort-amount-asc'
    },
    {
      name: 'Departamentos',
      routerName: '/departments',
      icon: PrimeIcons.USERS
    },
    {
      name: 'Prioridades',
      routerName: '/priorities',
      icon: 'fa fa-list-ol'
    },
    {
      name: 'Estados',
      routerName: '/status',
      icon: PrimeIcons.STAR_FILL
    },
  ]
}

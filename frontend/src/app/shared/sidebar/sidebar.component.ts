import { Component } from '@angular/core';
import { SidebarLinks } from 'src/app/core/interfaces/sidebar.links.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  links: SidebarLinks[] = [
    {
      name: 'Tickets',
      routerName: '/my-tickets'
    },
    {
      name: 'Create Tickets',
      routerName: '/create-tickets'
    },
    {
      name: 'Grupo',
      routerName: '/groups'
    },
    {
      name: 'Categorias',
      routerName: '/category'
    },
    {
      name: 'Flujos',
      routerName: '/flujos'
    },
    {
      name: 'Equipos de Trabajo',
      routerName: '/equipos'
    },
    {
      name: 'Prioridades',
      routerName: '/priorities'
    },
    {
      name: 'Estados',
      routerName: '/status'
    },
  ]
}

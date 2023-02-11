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
      name: 'My Tickets',
      routerName: '/my-tickets'
    },
    {
      name: 'Create Tickets',
      routerName: '/create-tickets'
    },
  ]
}

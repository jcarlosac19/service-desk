import { Component, Input } from '@angular/core';
import { KeyMap } from 'src/app/core/interfaces/sidebar.links.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent<T> {
  @Input('columns') columns: string[] = [];
  @Input('data') data: KeyMap[] = [];

  constructor() { }
}

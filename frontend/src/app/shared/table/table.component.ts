import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent<T> {
  @Input('columns') columns: T[] = [];
  @Input('data') data: T[] = [];

  constructor() { }
}

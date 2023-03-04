import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColumnTable } from 'src/app/core/interfaces/sidebar.links.interface';
import * as helpers from '../../core/helpers';
import { Ticket } from 'src/app/core/interfaces/ticket.interface';
import { Route, Router } from '@angular/router';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [
    `
      .item {
        flex-basis: calc(100% / 2);
        flex-grow: 1;
        flex-shrink: 1;
      }

      .row-item {
        cursor: pointer;
      }
      .row-item:hover {
          background-color: #c2c2c2;
      }
    `,
  ],
})
export class TableComponent {
  @Input('columns') columns: ColumnTable[] = [];
  @Input('data') data: any[] = [];

  @Output() rowItemClicked = new EventEmitter<Ticket>();
  buttons: number = 3;



  actionsContainer = {
    'display': 'grid',
      'place-items': 'center',
      'gap': '0.45rem',
      'grid-template-columns': `repeat(${this.buttons}, 1fr)`,
  };

  evaluateIsUndefined(value: any): boolean {
    return helpers.isNullOrUndefined(value);
  }

  constructor(private router: Router) {}

  ticketEvent(ticket: Ticket){
    this.rowItemClicked.emit(ticket);
  }

}

function removeKeys(
  obj: { [key: string]: any },
  keys: string[]
): { [key: string]: any } {
  const newObj = { ...obj };
  keys.forEach((key) => delete newObj[key]);
  return newObj;
}


import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColumnTable } from 'src/app/core/interfaces/sidebar.links.interface';
import * as helpers from '../../core/helpers';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [
    `
      .actions-container {
        display: grid;
        place-items: center;
        gap: 0.6rem;
        grid-template-columns: repeat(2, 1fr);
      }

      .item {
        flex-basis: calc(100% / 2);
        flex-grow: 1;
        flex-shrink: 1;
      }
    `,
  ],
})
export class TableComponent {
  @Input('columns') columns: ColumnTable[] = [];
  @Input('data') data: any[] = [];
  // @Input('rowSelected') rowSelected: any = {
  //   _id: '',
  //   nombre: '',
  //   color: '',
  //   creador_id: '',
  //   modificador_id: '',
  //   creado_a: '',
  //   actualizado_a: '',
  // };
  // @Output('onVisibleModal') onVisibleModal: EventEmitter<boolean> =
  //   new EventEmitter();
  // @Output('onSubmitRowSelected') onSubmitRowSelected: EventEmitter<any> =
  //   new EventEmitter();
  // visibleModal: boolean = false;
  // header: string = '';
  // isEdit: boolean = false;
  // copyColumns: ColumnTable[] = this.columns.filter(
  //   (column) => column.key !== 'acciones' && column.key !== '_id' && column.key !== 'modificador_id'
  // );
  // copyRowSelected: any = removeKeys(this.rowSelected, [
  //   '_id',
  //   'acciones',
  //   'modificador_id',
  //   'esta_eliminado',
  //   '__v'
  // ]);

  evaluateIsUndefined(value: any): boolean {
    return helpers.isNullOrUndefined(value);
  }

  // showModal(row: any, action = 'edit'): void {
  //   debugger;
  //   this.visibleModal = true;
  //   this.copyRowSelected = row;
  //   if (action === 'edit') {
  //     this.header = 'Editar grupo';
  //     this.isEdit = true
  //     return;
  //   }
  //   this.header = 'Eliminar grupo';
  //   this.isEdit = false;
  //   this.copyColumns = this.columns.filter((column) => column.key === '_id');
  //   this.copyRowSelected = removeKeys(this.copyRowSelected, [
  //     'nombre',
  //     'color',
  //     'creador_id',
  //     'modificador_id',
  //     'creado_a',
  //     'actualizado_a',
  //     'acciones',
  //   ]);
  // }

  // onSubmit(): void {
  //   debugger;
  //   this.visibleModal = false;
  //   console.log(this.rowSelected);
  //   //this.onSubmitRowSelected.emit(this.rowSelected);
  // }
  constructor() {}
}

function removeKeys(
  obj: { [key: string]: any },
  keys: string[]
): { [key: string]: any } {
  const newObj = { ...obj };
  keys.forEach((key) => delete newObj[key]);
  return newObj;
}

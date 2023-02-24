import { Component } from '@angular/core';
import { UserService } from 'src/app/core';
import {
  GroupDelete,
  GroupEdit,
  GroupResponse,
} from 'src/app/core/interfaces/group.interface';
import { ColumnTable } from 'src/app/core/interfaces/sidebar.links.interface';
import { GroupService } from 'src/app/core/services/group.service';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
})
export class GroupsComponent {
  private groups: GroupResponse[] = [];
  get getGroups(): GroupResponse[] {
    return [...this.groups];
  }

  visibleModal: boolean = false;
  isEdit: boolean = false;
  header: string = '';
  rowSelected: GroupResponse = {
    _id: '',
    nombre: '',
    color: '',
    creador_id: '',
    modificador_id: '',
    creado_a: new Date(),
    actualizado_a: new Date(),
  };
  rowSelectedEdit: GroupEdit = {
    nombre: '',
    color: '',
    creador_id: '',
    modificador_id: '',
    actualizado_a: new Date(),
  };
  rowSelectedDelete: GroupDelete = {
    _id: '',
  };
  columns: ColumnTable[] = [
    {
      name: 'Id',
      key: '_id',
    },
    {
      name: 'Nombre',
      key: 'nombre',
    },
    {
      name: 'Color',
      key: 'color',
    },
    {
      name: 'Creador',
      key: 'creador_id',
    },
    {
      name: 'modificador',
      key: 'modificador_id',
    },
    {
      name: 'Creado a',
      key: 'creado_a',
    },
    {
      name: 'Actualizado a',
      key: 'actualizado_a',
    },
    {
      name: 'Acciones',
      key: 'acciones',
      hasEditButton: true,
      hasRemoveButton: true,
      edit: (row: GroupResponse) => {
        debugger;
        this.rowSelectedEdit = this.materialization(row);
        this.rowSelected = this.materializationToRow(row);
        this.visibleModal = true;
        this.isEdit = true;
        this.header = 'Editar grupo';
        console.log('edit', this.rowSelectedEdit);
        console.log(this.visibleModal);
      },
      remove: (row: GroupDelete) => {
        debugger;
        this.rowSelectedDelete = row;
        this.isEdit = false;
        this.header = 'Eliminar grupo';
        this.visibleModal = true;
      },
      editIcon: PrimeIcons.PENCIL,
      removeIcon: PrimeIcons.TRASH,
    },
  ];
  constructor(
    private userService: UserService,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.userService.populate();
    this.groupService.getGroups().subscribe({
      next: (response) => {
        debugger;
        this.groups = response;
      },
    });
  }

  showModal(event: any): void {
    console.log(event.target.value);
    this.visibleModal = event.target.value;
  }

  onSubmitGroup(): void {
    console.log('submit', this.rowSelectedEdit);
    this.visibleModal = false;
    console.log(this.rowSelected);
    console.log(this.rowSelectedDelete);
  }

  materialization(row: GroupResponse): GroupEdit {
    return {
      nombre: row.nombre,
      color: row.color,
      creador_id: row.creador_id,
      modificador_id: row.modificador_id,
      actualizado_a: row.actualizado_a,
    };
  }

  materializationDelete(row: GroupDelete): GroupDelete {
    return {
      _id: row._id,
    };
  }

  materializationToRow(row: GroupResponse): GroupResponse {
    return {
      _id: row._id,
      nombre: row.nombre,
      color: row.color,
      creador_id: row.creador_id,
      modificador_id: row.modificador_id,
      creado_a: row.creado_a,
      actualizado_a: row.actualizado_a,
    };
  }
}

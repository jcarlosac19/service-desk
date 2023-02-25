import { Component } from '@angular/core';
import { UserService } from 'src/app/core';
import {
  Group,
  GroupCreate,
  GroupDelete,
  GroupEdit,
  GroupResponse,
} from 'src/app/core/interfaces/group.interface';
import { ColumnTable } from 'src/app/core/interfaces/sidebar.links.interface';
import { GroupService } from 'src/app/core/services/group.service';
import { PrimeIcons } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
})
export class GroupsComponent {
  private groups: Group[] = [];
  get getGroups(): Group[] {
    return [...this.groups];
  }
  visibleModal: boolean = false;
  deleteModal: boolean = false;
  label: string = 'Crear';
  header: string = '';
  action: string = '';
  message: string = '';
  messageResponse: string = '';
  rowCreate: GroupCreate = {
    nombre: '',
    color: '',
  };
  rowSelectedEdit: GroupEdit = {
    _id: '',
    nombre: '',
    color: '',
    creador_id: '',
    modificador_id: '',
    actualizado_a: new Date(),
  };
  rowSelectedDelete: GroupDelete = { _id: ''};
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
      hasCreateButton: true,
      edit: (row: GroupEdit) => {
        this.rowSelectedEdit = row;
        this.visibleModal = true;
        this.label = 'Guardar Cambios';
        this.header = 'Editar grupo';
        this.action = 'edit';
      },
      remove: (row: GroupDelete) => {
        this.rowSelectedDelete = row;
        this.label = 'Eliminar';
        this.header = 'Eliminar grupo';
        this.action = 'delete';
        this.message = `¿Está seguro que desea eliminar el grupo: ${row._id}?`;
        this.deleteModal = true;
      },
      create: () => {
        this.action = 'create';
        this.visibleModal = true;
        this.header = 'Crear grupo';
        this.label = 'Crear';
      },
      createIcon: PrimeIcons.PLUS,
      editIcon: PrimeIcons.PENCIL,
      removeIcon: PrimeIcons.TRASH,
    },
  ];
  

  constructor(
    private userService: UserService,
    private groupService: GroupService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userService.populate();
    this.fetchGroups();
  }

  fetchGroups(): void {
    this.groupService.getGroups().subscribe({
      next: (response) => {
        this.groups = this.materializeGroups(response);

      },
      error: (error) => console.error(error),
    });
  }

  materializeGroups(groups: GroupResponse[]): Group[] {
    const groupsMaterialized: Group[] = [];
    groups.forEach((group) => {
      groupsMaterialized.push({
        _id: group._id,
        nombre: group.nombre,
        color: group.color,
        creador_id: group.creador_id,
        modificador_id: group.modificador_id,
        creado_a: new Date(group.creado_a).toLocaleDateString('es-ES'),
        actualizado_a: new Date(group.actualizado_a).toLocaleDateString('es-ES'),
      });
    }
    );
    return groupsMaterialized;
  }

  onSubmitGroup(): void {
    this.visibleModal = false;
    this.deleteModal = false;
    if (this.action === 'edit') {
      this.groupService.editGroup(this.rowSelectedEdit).subscribe({
        next: (response) => {
          this.toastr.success(response.message, 'Éxito');
        },
        error: (error) => this.toastr.error(error?.error?.message, 'Error'),
      });
      this.rowSelectedEdit = {} as GroupEdit;
    }
    if (this.action === 'create') {
      this.groupService.createGroup(this.rowCreate).subscribe({
        next: (response) => {
          this.toastr.success(response.message, 'Éxito');
          this.fetchGroups();
        },
      });
      this.rowCreate = {} as GroupCreate;
    }
    if(this.action === 'delete'){
      this.groupService.deleteGroup(this.rowSelectedDelete._id).subscribe({
        next: (response) => {
          this.toastr.success(response.message, 'Éxito');
        },
        error: (error) => this.toastr.error(error?.error?.message, 'Error'),
      });
      this.rowSelectedDelete = {} as GroupDelete;
    }
    this.fetchGroups();
  }

  getObjectByAction(): GroupEdit | GroupCreate {
    return this.action === 'edit'  ? this.rowSelectedEdit : this.rowCreate;
  }

  columnsToDeleteByEdit: string[] = ['acciones', 'creado_a', 'actualizado_a', 'creador_id', 'modificador_id'];
  columnsToDeleteByCreate: string[] = ['acciones', 'creado_a', 'actualizado_a', 'creador_id', 'modificador_id', '_id'];
  getColumnsByAction(): ColumnTable[] {
    if(this.action === 'edit'){
      return this.columns.filter((column: ColumnTable) => !this.columnsToDeleteByEdit.includes(column.key));
    }
    return this.columns.filter((column: ColumnTable) => !this.columnsToDeleteByCreate.includes(column.key));
  }

}

export interface SidebarLinks {
  name: string;
  routerName: string;
}

export interface KeyMap {
  [key: string]: string;
}

export interface ColumnTable {
  name: string;
  key: string;
  show: boolean;
  isAvailableOnEdit: boolean;
  isAvailableOnCreation: boolean;
  hasCreateButton?: boolean;
  hasEditButton?: boolean;
  hasRemoveButton?: boolean;
  create?: () => void;
  edit?: (row: any) => void;
  remove?: (row: any) => void;
  openTicket?: () => void;
  createIcon?: string;
  editIcon?: string;
  removeIcon?: string;
}

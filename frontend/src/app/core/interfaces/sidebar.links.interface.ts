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
  hasEditButton?: boolean;
  hasRemoveButton?: boolean;
  edit?: (row: any) => void;
  remove?: (row: any) => void;
  editIcon?: string;
  removeIcon?: string;
}

export class DataTableModel<T>  {
    DataList: Array<T> = new Array<T>();
    RecordsFiltered!: number;
    RecordsTotal!: number;
    StartIndex!: number;
    EndIndex!: number;
    TotalCount!: number;
  }

import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { TableColumn } from "./models/table-column.model";

@Component({
  selector: "ftx-table",
  templateUrl: "./ftx-table.component.html",
  styleUrl: "./ftx-table.component.css",
})
export class FtxTableComponent implements OnInit, AfterViewInit {
  protected readonly Object = Object;
  public tableDataSource: MatTableDataSource<any> = new MatTableDataSource<any>(
    []
  );
  public displayedColumns!: string[];
  @ViewChild(MatPaginator, { static: false }) matPaginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort!: MatSort;

  @Input() rowActionTemplates: { [key: string]: TemplateRef<any> } = {};
  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() tableColumns!: TableColumn[];
  @Input() rowActionIcon!: string;
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[1];

  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() pageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  
  @Input() pageIndex = 0
  @Input() tamano:any;


  // this property needs to have a setter, to dynamically get changes from parent component
  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
  }

  constructor() {}

  ngOnInit(): void {
    const columnNames = this.tableColumns.map(
      (tableColumn: TableColumn) => tableColumn.name
    );
    if (this.rowActionIcon) {
      this.displayedColumns = [...columnNames, this.rowActionIcon];
    } else {
      this.displayedColumns = columnNames;
    }
  }

  // we need this, in order to make pagination work with *ngIf
  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.matPaginator;
  }

  setTableDataSource(data: any) {
    this.tableDataSource = new MatTableDataSource<any>(data);
    this.tableDataSource.paginator = this.matPaginator;
    this.tableDataSource.sort = this.matSort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  sortTable(sortParameters: Sort) {
    const activeColumn = this.tableColumns.find(
      (column) => column.name === sortParameters.active
    );
    if (activeColumn) {
      sortParameters.active = activeColumn.dataKey;
      this.sort.emit(sortParameters);
    } else {
      console.error(`Column with name ${sortParameters.active} not found.`);
    }
  }

  changepage(evento: any) {
   this.pageChange.emit(evento);    
  }
}

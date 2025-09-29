import { AfterViewInit, Component, ContentChild, EventEmitter, Input, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortHeader } from '@angular/material/sort';

@Component({
  selector: 'app-table-with-pagination',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortHeader, MatSort],
  templateUrl: './table-with-pagination.html',
  styleUrl: './table-with-pagination.css'
})
export class TableWithPagination<T extends object> implements AfterViewInit {
  @Input() data: T[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() columnHeaders: { [key: string]: string } = {};
  @Input() totalItems = 0;
  @Input() pageSize = 10;
  @Input() currentPage = 1;
  @Input() sortBy: string | null = null;
  @Input() sortDir: 'asc' | 'desc' | null = null;
  @Input() sortableFields: string[] = [];
  @Output() sortChange = new EventEmitter<{ sortBy: string, sortDir: 'asc' | 'desc' }>();

  @ContentChild('cellActions') cellActionsTpl?: TemplateRef<any>;

  @Output() pageChange = new EventEmitter<PageEvent>();

  dataSource = new MatTableDataSource<T>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

 ngOnChanges(changes: SimpleChanges) {
    this.dataSource = new MatTableDataSource<T>(this.data);
    if (this.paginator) {
      this.paginator.pageIndex = this.currentPage - 1;
      this.paginator.length = this.totalItems;
      this.paginator.pageSize = this.pageSize;
    }
  }

  isSortable(column: string): boolean {
  return this.sortableFields?.includes(column);
  }

  onSort(column: string) {
  if (!this.isSortable(column)) return;

  const newDir: 'asc' | 'desc' = (this.sortBy === column && this.sortDir === 'asc') ? 'desc' : 'asc';

  this.sortBy = column;
  this.sortDir = newDir;

  this.sortChange.emit({ sortBy: column, sortDir: newDir });
}

}

import { Component, OnInit } from '@angular/core';
import { TableWithPagination } from '../../sharedComponents/table-with-pagination/table-with-pagination';
import { ListShowroomResponse } from '../../../models/showroom.model';
import { Showroom } from '../../../services/showroom';
import { PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ConfirmService } from '../../../services/confirm-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-showroom-list',
  imports: [TableWithPagination, MatIconModule, MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,],
  templateUrl: './showroom-list.html',
  styleUrl: './showroom-list.css'
})
export class ShowroomList implements OnInit  {

  data: ListShowroomResponse[] = []

  displayedColumns = ['name', 'commercialRegistrationNumber', 'contactNumber', 'actions'];

  columnHeaders = {
    id: 'ID',
    name: 'Name',
    commercialRegistrationNumber: 'CR Number',
    contactNumber: 'Contact Number',
    actions: 'Actions'
  };
  
  sortBy: string | null = null;
  sortDir: 'asc' | 'desc' | null = null;


  totalItems = 0;
  pageSize = 10;
  currentPage = 1;

  constructor(private showroomService: Showroom,
    private router: Router,
    private confirmService: ConfirmService
  ) {}

  ngOnInit(): void {
    this.fetchDate(this.currentPage, this.pageSize)
  }

  fetchDate(page: number = 1, size: number = 10, sortBy?: string, sortDir?: string) {

    if(sortBy || sortDir) {
      this.showroomService.getShowroomList(page, size, sortBy, sortDir).subscribe({
        next: (res) => {
            this.data = res.data,
            this.totalItems = res.meta.total_elements,
            this.pageSize = size
            this.currentPage = res.meta.page
        },
        error: (err) => {
          console.log("Failed To fetch the showrooms", err)
        }
      })
    } else {
      this.showroomService.getShowroomList(page, size).subscribe({
        next: (res) => {
            this.data = res.data,
            this.totalItems = res.meta.total_elements,
            this.pageSize = size
            this.currentPage = res.meta.page
        },
        error: (err) => {
          console.log("Failed To fetch the showrooms", err)
        }
      })
    }
  }

  onPageChange(event: PageEvent) {
    this.fetchDate(event.pageIndex + 1, event.pageSize, this.sortBy? this.sortBy : undefined, this.sortDir? this.sortDir : undefined)
  }

  edit(row: ListShowroomResponse) {
    this.router.navigate(['/showrooms/update'], {
    queryParams: { id: row.id }
    });
  }

  delete(row: ListShowroomResponse) {
    this.confirmService
      .confirm({
        title: 'Delete Confirmation',
        message: 'Are you sure you want to delete this item?',
      })
      .subscribe((confirmed) => {
        if (confirmed) {
          this.showroomService.deleteShowroom(row.id).subscribe({
            next: () => {
              this.fetchDate(this.currentPage, this.pageSize)
            },
            error: (err) => {
              console.log('Failed to delete showroom', err);
            }
          })
          console.log('Item deleted');
        } else {
          console.log('Deletion cancelled');
        }
      });
  }

  goToDetails(row: ListShowroomResponse) {
  this.router.navigate(['/showrooms/details'], {
    queryParams: { id: row.id }
  });
}

  goToCreatePage() {
    this.router.navigate(['/showrooms/create'])
  }

onSortChange(sort: { sortBy: string, sortDir: 'asc' | 'desc' }) {
  this.sortBy = sort.sortBy;
  this.sortDir = sort.sortDir;
  this.fetchDate(this.currentPage, this.pageSize, this.sortBy, this.sortDir); 
}


}

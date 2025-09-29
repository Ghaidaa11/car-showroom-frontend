import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ListShowroomResponse } from '../../../models/showroom.model';
import { CarFilterRequest, CarResponseDto } from '../../../models/car.model';
import { CarService } from '../../../services/car-service';
import { PageEvent } from '@angular/material/paginator';
import { TableWithPagination } from '../../sharedComponents/table-with-pagination/table-with-pagination';
import { Showroom } from '../../../services/showroom';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-list',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  TableWithPagination],
  templateUrl: './car-list.html',
  styleUrl: './car-list.css'
})
export class CarList implements OnInit {

  form!: FormGroup
  
  carShowrooms: ListShowroomResponse[] | null = null 

  data: CarResponseDto [] | null = null

  totalItems = 0; 
  pageSize = 10; 
  currentPage = 1;

  displayedColumns = [
  'vin',
  'maker',
  'model',
  'modelYear',
  'price',
  'carShowroomName',
  'carShowroomContact'
];

columnHeaders = {
  vin: 'VIN',
  maker: 'Maker',
  model: 'Model',
  modelYear: 'Model Year',
  price: 'Price',
  carShowroomName: 'Showroom Name',
  carShowroomContact: 'Showroom Phone'
};


  constructor(private fb: FormBuilder,
    private carService: CarService,
    private showroomService: Showroom,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.form = this.fb.group({
      vin: [''],
      maker: [''],
      model: [''],
      modelYear: [null],
      carShowroomName: [''] 
    });

    this.fetchCars(this.currentPage, this.pageSize)
    this.fetchShowrooms()
  }

   fetchShowrooms () {
    const res = this.showroomService.getShowrooms().subscribe({
      next: (res) => {
        this.carShowrooms = res
      } 
    })
    console.log(res)
    return res
  }

  fetchCars = (page: number, pageSize: number, filter?: CarFilterRequest) => {
    return this.carService.gitCarsList(filter ?? null, page, pageSize).subscribe({
      next: (res: any) => {
        this.data = res.data?.map((item: any) => ({
        vin: item.vin,
        maker: item.maker,
        model: item.model,
        modelYear: item.modelYear,
        price: item.price,
        carShowroomName: item.carShowroom?.name || '',
        carShowroomContact: item.carShowroom?.contactNumber || ''
      }));
      this.totalItems = res.meta?.total_elements; 
      this.pageSize = pageSize 
      this.currentPage = res?.meta?.page;
      }
    })
  }

  onPageChange(event: PageEvent) {
    this.fetchCars(event.pageIndex + 1, event.pageSize)
  }

  cleanFilter(filter: CarFilterRequest): CarFilterRequest {
  return Object.fromEntries(
    Object.entries(filter).filter(([_, value]) => value != null && value !== '')
  );
}


  onSearch(): void {
    const cleanedFilter = this.cleanFilter(this.form.value);
    this.fetchCars(this.currentPage, this.pageSize, cleanedFilter)
  }

  clearFields(): void {
  this.form.reset(); 
  this.fetchCars(this.currentPage, this.pageSize);
  }

  goToCreatePage () {
    this.router.navigate(['cars/create'])
  }


}

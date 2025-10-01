import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PageEvent } from '@angular/material/paginator';

import { Card } from '../../sharedComponents/card/card';
import { Tabs } from '../../sharedComponents/tabs/tabs';
import { TableWithPagination } from '../../sharedComponents/table-with-pagination/table-with-pagination';

import {
  ListShowroomResponse,
  ShowroomResponse
} from '../../../models/showroom.model';
import { CarFilterRequest, CarResponseDto } from '../../../models/car.model';

import { Showroom } from '../../../services/showroom';
import { CarService } from '../../../services/car-service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-showroom-details',
  standalone: true,
  imports: [
    CommonModule,
    Card,
    MatIconModule,
    Tabs,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    TableWithPagination
  ],
  templateUrl: './showroom-details.html',
  styleUrls: ['./showroom-details.css']
})
export class ShowroomDetails implements OnInit, AfterViewInit {
  tabs = ['Details', 'Cars'];
  tabTemplates: TemplateRef<any>[] = [];
  @ViewChild('tab0', { static: true }) tab0!: TemplateRef<any>;
  @ViewChild('tab1', { static: true }) tab1!: TemplateRef<any>;

  showroom: ShowroomResponse | null = null;

  filterCar: CarFilterRequest = {}

  form!: FormGroup;
  carShowrooms: ListShowroomResponse[] | null = null;
  data: CarResponseDto[] | null = null;

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

  constructor(
    private showroomService: Showroom,
    private carService: CarService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.queryParamMap.get('id'));
    if (id) {
      this.fetchData(id);
    } else {
      console.error('No ID in query params');
    }


    this.form = this.fb.group({
      vin: [''],
      maker: [''],
      model: [''],
      modelYear: [null],
      carShowroomName: ['']
    });


    this.fetchShowrooms();
    
  }

  ngAfterViewInit(): void {
    this.tabTemplates = [this.tab0, this.tab1];
  }

  fetchData(id: number) {
    return this.showroomService.getShowroom(id).subscribe({
      next: (res) => {
        this.showroom = res;

        this.filterCar = { carShowroomName: res.name };

        this.fetchCars(this.currentPage, this.pageSize);
      },
      error: (err) => {
        console.log('Failed to fetch the data', err)
      }
    })
  }

  edit(row: ListShowroomResponse) {
      this.router.navigate(['/showrooms/update'], {
      queryParams: { id: row.id }
      });
  }

  
  fetchCars(page: number, pageSize: number, filter?: CarFilterRequest) {

    if (filter) {
      filter.carShowroomName = this.showroom?.name
    }

    const finalFilter = filter ?? this.filterCar;
    
    return this.carService.gitCarsList(finalFilter, page, pageSize).subscribe({
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
        this.pageSize = pageSize;
        this.currentPage = res?.meta?.page;
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.fetchCars(event.pageIndex + 1, event.pageSize, this.filterCar);
  }

  cleanFilter(filter: CarFilterRequest): CarFilterRequest {
    return Object.fromEntries(
      Object.entries(filter).filter(
        ([_, value]) => value != null && value !== ''
      )
    );
  }

  onSearch(): void {
    const cleanedFilter = this.cleanFilter(this.form.value);
    this.fetchCars(this.currentPage, this.pageSize, cleanedFilter);
  }

  clearFields(): void {
    this.form.reset();
    this.fetchCars(this.currentPage, this.pageSize, this.filterCar);
  }

  goToCreatePage() {
    this.router.navigate(['cars/create']);
  }

  
  fetchShowrooms() {
    const res = this.showroomService.getShowrooms().subscribe({
      next: (res) => {
        this.carShowrooms = res;
      }
    });
    return res;
  }
}

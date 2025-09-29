import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarCreationRequest, CarFilterRequest } from '../models/car.model';
import { baseUrl, End_POINTS } from '../config/api.config';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient){}

  gitCarsList(filter: CarFilterRequest | null, page: number, size: number) {

    return this.http.post(`${baseUrl + End_POINTS.CARS_LIST.URL(page, size)}`, filter ?? {})

  }

  createCar(payload: CarCreationRequest) {
    return firstValueFrom(this.http.post(`${baseUrl + End_POINTS.CREATE_CAR.URL}`, payload))
  }


  
}

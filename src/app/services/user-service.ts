import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponse } from '../models/showroom.model';
import { baseUrl, End_POINTS } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
    constructor(private http: HttpClient) {}

    getManagers() {
      return this.http.get<UserResponse []>(`${baseUrl + End_POINTS.MANAGERS.URL}`)
    }

}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationResponse } from '../models/paginationa.model';
import { ListShowroomResponse, ShowroomRequest, ShowroomResponse, UpdateShowroomRequest } from '../models/showroom.model';
import { firstValueFrom, Observable } from 'rxjs';
import { baseUrl, End_POINTS } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class Showroom {

  constructor(private http: HttpClient) {}

    getShowroomList(page: number, size: number, sortBy?: string, sortDir?: string): Observable<PaginationResponse<ListShowroomResponse>> {

    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (sortBy) {
      params = params.set('sortBy', sortBy);
    }

    if (sortDir) {
      params = params.set('sortDir', sortDir);
    }

    return this.http.get<PaginationResponse<ListShowroomResponse>>(`${baseUrl + End_POINTS.SHOWROOM_LIST.URL}`,{ params }
    );
  }


  getShowroom(id: number): Observable<ShowroomResponse> {
    return this.http.get<ShowroomResponse>(`${baseUrl + End_POINTS.SHOWROOM.URL(id)}`)
  }

  async createShowRoom(body: ShowroomRequest) {
    await firstValueFrom(this.http.post(`${baseUrl + End_POINTS.CREATE_SHOWROOM.URL}`, body));
  }

  async updateShowroom(body: UpdateShowroomRequest, id: number) {
    await firstValueFrom(this.http.patch(`${baseUrl + End_POINTS.UPDATE_SHOWROOM.URL(id)}`, body))
  }

  deleteShowroom(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl + End_POINTS.DELETE_SHOWROOM.URL(id)}`)
  }

  getShowrooms(): Observable<ListShowroomResponse []> {
    return this.http.get<ListShowroomResponse[]>(`${baseUrl + End_POINTS.ALL_SHOWROOMS_AS_LIST.URL}`)
  }

}

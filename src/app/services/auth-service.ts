import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthenticationResponse } from '../models/authentiation.model';
import { baseUrl, End_POINTS } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) {}

  login(phone: string, password: string): Observable<any> {
    return this.http.post(`${ baseUrl + End_POINTS.LOGIN.URL}`, {phone, password}).pipe(
      tap((res: any) => {
        localStorage.setItem('jwt', res.token)
        localStorage.setItem('role', res.role)
      })
    )
  }

  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

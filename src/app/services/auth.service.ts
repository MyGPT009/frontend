import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthLoginI, AuthRegisterI, AuthUserI } from '../models/auth.model';
import { environment } from '../../environments/environment';
import { JwtI } from '../models/jwt.model';
import { JwtService } from "./jwt.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private JwtService: JwtService) {}

  register(credentials: AuthRegisterI): Observable<AuthRegisterI> {
    return this.http.post<AuthRegisterI>(`${this.apiUrl}/register`, credentials);
  }

  login(credentials: AuthLoginI): Observable<JwtI> {
    return this.http.post<JwtI>(`${this.apiUrl}/login`, credentials);
  }

  logout(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/logout`).pipe(
      tap(() => {
        this.JwtService.clearJwt(); // Clear jwt after logout
      })
    );
  }

  me(): Observable<AuthUserI> {
    return this.http.get<AuthUserI>(`${this.apiUrl}/me`);
  }

  handleLoginResponse(response: JwtI) {
    this.JwtService.setJwt(response);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MessageI } from '../models/chat.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = `${environment.apiUrl}/channel`;

  constructor(private http: HttpClient) {}

  sendMessage(message: MessageI): Observable<MessageI> {
    return this.http.post<MessageI>(`${this.apiUrl}/message`, message);
  }
}

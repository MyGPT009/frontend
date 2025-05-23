import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MessageI } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = `${environment.apiUrl}/message`;

  constructor(private http: HttpClient) {}

  index(conversationId: string): Observable<MessageI[]> {
    return this.http.get<MessageI[]>(`${this.apiUrl}/conversation/${conversationId}`);
  }

  send(conversationId: string, message: Partial<MessageI>): Observable<MessageI> {
    return this.http.post<MessageI>(`${this.apiUrl}/conversation/${conversationId}/send`, message);
  }
}

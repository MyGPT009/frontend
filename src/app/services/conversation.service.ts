import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ConversationI } from '../models/conversation.model';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  private apiUrl = `${environment.apiUrl}/conversation`;

  constructor(private http: HttpClient) {}

  index(): Observable<ConversationI[]> {
    return this.http.get<ConversationI[]>(`${this.apiUrl}`);
  }

  new(): Observable<ConversationI> {
    return this.http.post<ConversationI>(`${this.apiUrl}/new`, {});
  }
}

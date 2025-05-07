import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Message } from '../models/chat.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = `${environment.apiUrl}/channel`;

  constructor(private http: HttpClient) {}

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/message`, message);
  }
}

import { Component } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Message } from '../../models/chat.model';

@Component({
  selector: 'app-chat',
  imports: [
    NgClass,
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  messages: Message[] = [];
  userInput: string = '';
  loading: boolean = false;

  sendMessage() {}
}

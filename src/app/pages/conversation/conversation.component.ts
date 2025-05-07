import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { MessageI } from '../../models/message.model';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-conversation',
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.css'
})
export class ConversationComponent implements OnInit {
  messages: MessageI[] = [];
  userInput: string = '';
  loading: boolean = false;
  conversationId: string = '';

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.conversationId = params['id'];
      // Tu peux ici charger les messages existants si nécessaire
    });
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    const newMessage: Partial<MessageI> = {
      content: this.userInput.trim(),
    };

    this.loading = true;

    this.messageService.sendMessage(this.conversationId, newMessage).subscribe({
      next: (savedMessage: MessageI) => {
        this.messages.push(savedMessage);
        this.userInput = '';
        this.loading = false;
      },
      error: (error) => {
        console.error('Error saving message:', error);
        this.loading = false;
      }
    });
  }
}

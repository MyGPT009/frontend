import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('messageList') private messageList!: ElementRef;

  messages: MessageI[] = [];
  userInput: string = '';
  loading: boolean = false;
  conversationId: string = '';

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.conversationId = params['id'];
      this.loadMessages(); // Charge les messages existants
    });
  }

  loadMessages() {
    this.loading = true;
    this.messageService.index(this.conversationId).subscribe({
      next: (fetchedMessages: MessageI[]) => {
        this.messages = fetchedMessages;
        this.loading = false;
        this.scrollToBottom();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des messages:', error);
        this.loading = false;
      }
    });
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    const newMessage: Partial<MessageI> = {
      content: this.userInput.trim(),
    };

    this.loading = true;

    this.messageService.send(this.conversationId, newMessage).subscribe({
      next: (savedMessage: MessageI) => {
        this.messages.push(savedMessage);
        this.userInput = '';
        this.loading = false;
        this.scrollToBottom(); // <-- Ajout ici
      },
      error: (error) => {
        console.error('Error saving message:', error);
        this.loading = false;
      }
    });
  }

  scrollToBottom(): void {
    this.changeDetectorRef.detectChanges();
    setTimeout(() => {
      const el = this.messageList?.nativeElement;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    }, 100);
  }
}

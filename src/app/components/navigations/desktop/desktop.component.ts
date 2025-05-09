import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../../constants/routes';
import { ConversationService } from '../../../services/conversation.service';
import { ConversationI } from '../../../models/conversation.model';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-desktop',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.css'
})
export class DesktopComponent implements OnInit {
  conversations: ConversationI[] = [];
  loading: boolean = false;

  constructor(
    private router: Router,
    private conversationService: ConversationService,
  ) {}

  ngOnInit() {
    this.loadConversation(); // Charge les messages existants
  }

  loadConversation() {
    this.loading = true;
    this.conversationService.index().subscribe({
      next: (fetchedConversations: ConversationI[]) => {
        this.conversations = fetchedConversations;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des messages:', error);
        this.loading = false;
      }
    });
  }

  isActiveRoute(path: string): boolean {
    const fullPath = '/' + path; // Normalize
    return this.router.url === fullPath || this.router.url.startsWith(fullPath + '/');
  }

  goToHome(): void {
    this.router.navigate([APP_ROUTES.HOME]);
  }

  goToSetting(): void {
    this.router.navigate([APP_ROUTES.SETTING]);
  }

  goToProfile(): void {
    this.router.navigate([APP_ROUTES.PROFILE]);
  }

  goToConversation(conversationId: number): void {
    this.router.navigate([APP_ROUTES.CONVERSATION.ID.replace(':id', String(conversationId))]);
  }

  protected readonly APP_ROUTES = APP_ROUTES;
}

import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { AuthUserI } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../constants/routes';

@Component({
  selector: 'app-profile',
  imports: [
    NgIf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent  implements OnInit {
  auth!: AuthUserI;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.authService.me().subscribe({
      next: (response) => {
        this.auth = response;
      },
      error: (error: any) => {
        console.error('Failed to fetch user profile:', error);
      }
    });
  }

  logout() {
    return this.authService.logout().subscribe({
      next: () => {
        this.router.navigate([APP_ROUTES.AUTH.LOGIN]);
        console.log('Déconnexion réussie');
      },
      error: (error) => console.error('Erreur lors de la déconnexion', error)
    });
  }
}

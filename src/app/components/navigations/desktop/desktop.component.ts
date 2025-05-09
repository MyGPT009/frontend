import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../../constants/routes';

@Component({
  selector: 'app-desktop',
  imports: [],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.css'
})
export class DesktopComponent {
  constructor(
    private router: Router
  ) {}

  goToHome(): void {
    this.router.navigate([APP_ROUTES.HOME]);
  }

  goToSetting(): void {
    this.router.navigate([APP_ROUTES.SETTING]);
  }

  goToProfile(): void {
    this.router.navigate([APP_ROUTES.PROFILE]);
  }
}

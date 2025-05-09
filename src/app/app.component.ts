import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DesktopComponent } from './components/navigations/desktop/desktop.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DesktopComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  constructor(public router: Router) {}

  get isAuthPage(): boolean {
    return this.router.url.startsWith('/auth/');
  }
}

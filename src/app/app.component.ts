import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DesktopComponent } from './components/navigations/desktop/desktop.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DesktopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}

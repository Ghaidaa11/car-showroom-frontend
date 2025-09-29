import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from './components/sharedComponents/toolbar/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Toolbar],
  template: `
  <app-toolbar></app-toolbar>
  <router-outlet></router-outlet>`,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('car-showroom-frontend');
}

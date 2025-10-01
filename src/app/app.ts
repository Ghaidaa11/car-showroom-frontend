import { Component, computed, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Toolbar } from './components/sharedComponents/toolbar/toolbar';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Toolbar, CommonModule],
  template: `
    <app-toolbar *ngIf="showToolbar()"></app-toolbar>
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('car-showroom-frontend');

  private currentUrl = signal('');

  showToolbar = computed(() => {
    const url = this.currentUrl();
    return !(url === '/');
  });

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl.set(event.urlAfterRedirects);
      });
  }
  
}

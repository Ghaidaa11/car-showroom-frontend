import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-toolbar',
  imports: [CommonModule, MatToolbarModule, MatButtonModule, RouterModule],
  template: `
    <mat-toolbar color="accent">
      <span>My Application</span>
      <button mat-button routerLink="/showrooms" routerLinkActive="active-link">Showrooms</button>
      <button mat-button routerLink="/cars" routerLinkActive="active-link">Cars</button>
      <span class="spacer"></span>
    </mat-toolbar>
  `,
  styles: [`
    .spacer { flex: 1 1 auto; }
    .active-link { font-weight: bold; text-decoration: underline; }
  `]
})
export class Toolbar {

}

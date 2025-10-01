import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-toolbar',
  imports: [CommonModule, MatToolbarModule, MatButtonModule, RouterModule, MatIcon],
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.css']
})
export class Toolbar {
constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    this.router.navigate(['/']);
  }
}

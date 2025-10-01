import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, 
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  phone = '';
  password = '';
  errorMessage = '';
  hidePassword = true;

  constructor(private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.authService.login(this.phone, this.password).subscribe({
      next: (res) => {
        this.router.navigate(['/showrooms'])
      },
      error: (err) => {
        console.log('Login error', err);
        this.errorMessage = err.error || 'Login failed';
      }
    })
  }
 
}

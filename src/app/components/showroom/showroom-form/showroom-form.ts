import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Card } from '../../sharedComponents/card/card';
import { UserService } from '../../../services/user-service';
import { UserResponse } from '../../../models/showroom.model';
import { Showroom } from '../../../services/showroom';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-showroom-form',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, Card],
  templateUrl: './showroom-form.html',
  styleUrl: './showroom-form.css'
})
export class ShowroomForm implements OnInit {

  title = "Create New Car Showroom"
  subtitle = null

  showroomForm: FormGroup;

  managers: UserResponse[] | null = null 

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private showrommService: Showroom,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.showroomForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      commercialRegistrationNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      managerId: [''],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\d{1,15}$/)]],
      address: ['', [Validators.maxLength(255)]]
    })


  }
  ngOnInit(): void {
    this.fetchManagers()
  }

  fetchManagers() {
    this.userService.getManagers().subscribe({
      next: (res) => {
        this.managers = res
      },
      error: (err) => {
        console.log("Failed to fetch managers", err)
      }
    })
  }
  
  async onSubmit() {
    if (this.showroomForm.valid) {
      console.log('Form Data:', this.showroomForm.value);
      try {
        await this.showrommService.createShowRoom(this.showroomForm.value)
        this.showToast('Showroom created successfully!', 'success')
        this.router.navigate(['/showrooms'])
      } catch (err: any) {
        console.error(err);
        this.showToast(err?.error?.message || 'Failed to create showroom.', 'error');
      }
    }
  }

  showToast(message: string, type: 'success' | 'error' = 'success') {
  this.snackBar.open(message, '', {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: type === 'success' ? ['toast-success'] : ['toast-error']
  });
}

}

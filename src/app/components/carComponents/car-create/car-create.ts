import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListShowroomResponse } from '../../../models/showroom.model';
import { CarService } from '../../../services/car-service';
import { Showroom } from '../../../services/showroom';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CarCreationRequest } from '../../../models/car.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Card } from '../../sharedComponents/card/card';

@Component({
  selector: 'app-car-create',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, Card],
  templateUrl: './car-create.html',
  styleUrl: './car-create.css'
})
export class CarCreate {

  title = 'Create Car';
  subtitle = 'Fill in the car details below';
  carForm!: FormGroup;
  showrooms: ListShowroomResponse[] = [];

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private showroomService: Showroom,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carForm = this.fb.group({
      vin: ['', [Validators.required, Validators.maxLength(25)]],
      maker: ['', [Validators.required, Validators.maxLength(25)]],
      model: ['', [Validators.required, Validators.maxLength(25)]],
      modelYear: [
        '',
        [Validators.required, Validators.pattern(/^\d{4}$/)]
      ],
      price: ['', Validators.required],
      showroomId: ['', Validators.required]
    });

    this.fetchShowrooms();
  }

  fetchShowrooms() {
    this.showroomService.getShowrooms().subscribe({
      next: (res) => {
        this.showrooms = res
      },
      error: (err) => console.error('Failed to fetch showrooms', err)
    });
  }

  async onSubmit() {
    if (this.carForm.valid) {
      try {
        const body: CarCreationRequest = this.carForm.value;
        await this.carService.createCar(body);
        this.showToast('Car created successfully!', 'success', () => {
          this.router.navigate(['/cars']);
        });
      } catch (err: any) {
        console.error(err);
        this.showToast(err?.error?.message || 'Failed to create car', 'error');
      }
    }
  }

  showToast(message: string, type: 'success' | 'error', callback?: () => void) {
    const ref = this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: type === 'success' ? ['toast-success'] : ['toast-error']
    });

    ref.afterDismissed().subscribe(() => {
      if (callback) callback();
    });
  }
}

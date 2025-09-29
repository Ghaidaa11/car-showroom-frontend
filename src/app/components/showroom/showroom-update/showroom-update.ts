import { ShowroomResponse, UpdateShowroomRequest, UserResponse } from '../../../models/showroom.model';
import { UserService } from '../../../services/user-service';
import { Showroom } from '../../../services/showroom';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Card } from '../../sharedComponents/card/card';

@Component({
  selector: 'app-showroom-update',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, Card],
  templateUrl: './showroom-update.html',
  styleUrl: './showroom-update.css'
})
export class ShowroomUpdate implements OnInit {
  title = "Update Car Showroom"
  subtitle = null

  showroomForm: FormGroup;

  id: number | undefined = undefined 

  managers: UserResponse[] | null = null
  showroom: ShowroomResponse | null = null 

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private showrommService: Showroom,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router

  ) {
    this.showroomForm = this.fb.group({
      managerId: [''],
      contactNumber: ['', [Validators.pattern(/^\d{1,15}$/)]],
      address: ['', [Validators.maxLength(255)]]
    })
  }
  ngOnInit(): void {
    this.fetchManagers()
    this.id = Number(this.route.snapshot.queryParamMap.get('id'));
    if (this.id) {
      this.fetchData(this.id);
    } else {
      console.error('No ID in query params');
    }
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

  fetchData(id: number) {
    this.showrommService.getShowroom(id).subscribe({
      next: (res) => {
        this.showroom = res

        this.showroomForm.patchValue({
        managerId: res.manager?.id ?? '',
        contactNumber: res.contactNumber ?? '',
        address: res.address ?? ''

      });
      },
      error: (err) => {
        console.log('Failed to fetch the data', err)
      }
    })
  }

  private getUpdatedFields() {
  const updated: UpdateShowroomRequest = {};
  const formValue = this.showroomForm.value;

  if (formValue.managerId !== this.showroom?.manager?.id) {
    updated.managerId = formValue.managerId;
  }

  if (formValue.contactNumber !== this.showroom?.contactNumber) {
    updated.contactNumber = formValue.contactNumber;
  }

  if (formValue.address !== this.showroom?.address) {
    updated.address = formValue.address;
  }

  return updated;
}

  
  async onSubmit() {
    if (this.showroomForm.valid && this.id !== undefined) {
      const updatedFields = this.getUpdatedFields();
      console.log('Form Data:', updatedFields);
      try {
        if (this.id !== undefined) {
          await this.showrommService.updateShowroom(updatedFields, this.id);
        }
        this.showToast('Showroom updated successfully!', 'success')
        this.router.navigate(['/showrooms']);
      } catch (err: any) {
        console.error(err);
        this.showToast(err?.error?.message || 'Failed to update showroom.', 'error');
      }
    }
  }

  showToast(message: string, type: 'success' | 'error', callback?: () => void) {
  const ref =this.snackBar.open(message, '', {
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

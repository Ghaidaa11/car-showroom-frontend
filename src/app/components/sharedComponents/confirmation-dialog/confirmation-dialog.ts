import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [CommonModule, MatButtonModule, MatDialogActions, MatDialogContent],
  templateUrl: './confirmation-dialog.html',
  styleUrl: './confirmation-dialog.css',
  standalone: true
})
export class ConfirmationDialog {
    constructor(
        public dialogRef: MatDialogRef<ConfirmationDialog>,
        @Inject(MAT_DIALOG_DATA) public data: { title?: string; message?: string }
      ) {}

      onConfirm(): void {
        this.dialogRef.close(true);
      }

      onCancel(): void {
        this.dialogRef.close(false);
      }
}

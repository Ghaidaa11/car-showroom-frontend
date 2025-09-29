import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../components/sharedComponents/confirmation-dialog/confirmation-dialog';


@Injectable({
  providedIn: 'root'
})

export class ConfirmService {
  private dialog = inject(MatDialog);

  confirm(options: { title?: string; message?: string }) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: options,
      width: '100%',         
      maxWidth: '500px',     
      disableClose: true,    
    });

    return dialogRef.afterClosed(); // returns Observable<boolean>
  }
}

import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent {

  action!: string;
  message!: string;
  rejectReason: string = '';

  constructor(
    public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: string, message: string }
  ) {
    this.message = data.message;
    this.action = data.action;
  }

  confirm() {
    // this.dialogRef.close({confirmed: true});
    if (this.rejectReason) {
      if (this.rejectReason.length < 10) {
        alert('Please provide a reason of at least 10 characters');
        return;
      }
      this.dialogRef.close({confirmed: true, rejectReason: this.rejectReason});
    } else {
      this.dialogRef.close({confirmed: true});
    }
  }

}

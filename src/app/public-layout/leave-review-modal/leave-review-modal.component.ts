import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AppointmentRichObject} from "../../interfaces/appointment-rich-object";
import {Review} from "../../interfaces/review";

@Component({
  selector: 'app-leave-review-modal',
  templateUrl: './leave-review-modal.component.html',
  styleUrl: './leave-review-modal.component.css'
})
export class LeaveReviewModalComponent {

  reviewForm: FormGroup;
  appointment: AppointmentRichObject | undefined;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LeaveReviewModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.appointment = data.appointment;

    this.reviewForm = this.fb.group({
      service: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      priceQuality: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      hygiene: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      ambience: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      comment: ['', Validators.maxLength(500)]
    });
  }

  submitReview() {
    if (this.reviewForm.valid) {
      // Process your form data here. E.g., send it to the backend.
      this.dialogRef.close(this.reviewForm.value as Review);
    }
  }

  close() {

  }

}

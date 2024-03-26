import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Review} from "../../interfaces/review";

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrl: './review-dialog.component.css'
})
export class ReviewDialogComponent {

  reviewForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.reviewForm = this.fb.group({
      service: [this.data?.review?.service || '', [Validators.required, Validators.min(1), Validators.max(10)]],
      priceQuality: [this.data?.review?.priceQuality || '', [Validators.required, Validators.min(1), Validators.max(10)]],
      hygiene: [this.data?.review?.hygiene || '', [Validators.required, Validators.min(1), Validators.max(10)]],
      ambience: [this.data?.review?.ambience || '', [Validators.required, Validators.min(1), Validators.max(10)]],
      comment: [this.data?.review?.comment || '', Validators.maxLength(500)]
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

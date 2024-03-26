import {Component} from '@angular/core';
import {Account} from "../../interfaces/account";
import {AppointmentRichObject} from "../../interfaces/appointment-rich-object";
import {AuthService} from "../../auth.service";
import {AppointmentService} from "../booking/services/appointment.service";
import {Review} from "../../interfaces/review";
import {ReviewDialogComponent} from "../review-dialog/review-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ReviewRequest} from "../../interfaces/review-request";

interface ReviewData {
  review: Review;
  appointmentData: AppointmentRichObject;
}

@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.component.html',
  styleUrl: './review-details.component.css'
})
export class ReviewDetailsComponent {

  user: Account | undefined;
  reviews: ReviewData[] = [];

  constructor(private authService: AuthService, private appointmentService: AppointmentService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    if (!this.user) {
      console.log('User is not logged in');
      throw new Error('User is not logged in');
    }
    this.loadReviews();
  }

  private loadReviews() {
    this.appointmentService.getAppointmentsForUser(this.user!.id).subscribe(appointments => {
      this.reviews = appointments
        .filter(appointment => appointment.review)
        .map(
          appointment => ({
            review: appointment.review!,
            appointmentData: appointment
          })
        )
    });
  }

  openReviewDialog(reviewData: ReviewData) {
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      width: '500px',
      data: {review: reviewData?.review}
    });

    dialogRef.afterClosed().subscribe((result: Review) => {
      if (result) {
        this.updateReview(reviewData.appointmentData.appointment.id, result); // Implement this method to update the review
      }
    });
  }

  private updateReview(appointmentId: number, result: Review) {
    const reviewRequest: ReviewRequest = {
      ...result
    };
    reviewRequest.appointmentId = appointmentId;

    this.appointmentService.updateReview(reviewRequest).subscribe(() => {
      this.loadReviews();
    });
  }

  deleteReview(reviewData: ReviewData) {
    if (confirm('Da li ste sigurni da želite da obrišete ovu recenziju?')) {
      // Call your service method to delete the review, then refresh the reviews list
      this.appointmentService.deleteReview(reviewData.review.id).subscribe(() => {
        this.loadReviews(); // Reload or update your reviews list
      });
    }
  }
}

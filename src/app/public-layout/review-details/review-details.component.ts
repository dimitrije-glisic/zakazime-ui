import {Component} from '@angular/core';
import {Account} from "../../interfaces/account";
import {AppointmentRichObject} from "../../interfaces/appointment-rich-object";
import {AuthService} from "../../auth.service";
import {AppointmentService} from "../booking/services/appointment.service";
import {Review} from "../../interfaces/review";

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

  constructor(private authService: AuthService, private appointmentService: AppointmentService) {
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

}

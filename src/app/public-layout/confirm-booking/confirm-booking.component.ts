import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.css']
})
export class ConfirmBookingComponent {
  bookingDetails: any; // Replace with the actual type of your booking details

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // Retrieve booking details from route parameters or a service
    this.route.queryParams.subscribe(params => {
      // Logic to set bookingDetails based on params
    });
  }

  confirmBooking() {
    // Logic to confirm the booking
  }
}

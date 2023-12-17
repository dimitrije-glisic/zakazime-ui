import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.css']
})
export class ConfirmBookingComponent {
  bookingDetails: any; // Replace with the actual type of your booking details

  totalSum: number = 10; // Replace with the actual total sum
  selectedTime: string = '10:00'; // Replace with the actual selected time
  selectedDate: Date = new Date(); // Replace with the actual selected date
  selectedServices: any[] = [{
    name: 'Service 1',
    price: 10
  }]; // Replace with the actual selected services

  businessName: string = '';

  constructor(private route: ActivatedRoute) {
    // http://localhost:4200/booking/HealthHub/confirm-booking
    //extract the business name from the url (HealthHub)
    this.route.url.subscribe(url => {
      this.businessName = url[1].path;
      console.log(this.businessName);
    }
    );

  }

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

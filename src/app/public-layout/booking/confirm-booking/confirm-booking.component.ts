import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../booking.service';
import { Service } from 'src/app/interfaces/service.interface';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.css']
})
export class ConfirmBookingComponent {
  businessName: string;
  selectedServices: Service[];
  totalSum: number;
  selectedTime: string = '';

  constructor(private route: ActivatedRoute, private bookingService: BookingService) {
    this.businessName = this.bookingService.getBusinessId();
    this.selectedServices = this.bookingService.getSelectedServices();
    this.totalSum = this.selectedServices.reduce((sum, service) => sum + service.price, 0);
    this.selectedTime = this.bookingService.getSelectedTime() ?? '';
  }

  confirmBooking() {
    // Logic to confirm the booking
  }
}

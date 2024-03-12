import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookingService} from "../services/booking.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-available-slots',
  templateUrl: './available-slots.component.html',
  styleUrl: './available-slots.component.css'
})
export class AvailableSlotsComponent {

  @Input() availableSlots: string[] | undefined;
  @Output() onSelectedTime: EventEmitter<string> = new EventEmitter<string>();

  onTimeSelected(time: string) {
    this.onSelectedTime.emit(time);
    // this.router.navigate(['booking', this.bookingService.getBusinessId(), 'confirm-booking']);
  }

}

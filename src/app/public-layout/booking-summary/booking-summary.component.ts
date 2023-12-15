import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.css']
})
export class BookingSummaryComponent {
  @Input() selectedServices: any[] = [];
  @Input() selectedTime: string | null = null;
  @Input() totalSum: number = 0;
  @Input() buttonLabel: string = 'Confirm booking';
  @Output() buttonClick = new EventEmitter<void>();

  onButtonClick() {
    this.buttonClick.emit(); // Emit the event when the button is clicked
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import {Service} from "../../../openapi";

@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.css']
})
export class BookingSummaryComponent {
  @Input() selectedServices: Service[] = [];
  @Input() selectedTime: string | null = null;
  @Input() buttonLabel: string = 'Confirm booking';

  @Output() buttonClick = new EventEmitter<void>();

  totalSum: number | undefined;

  ngOnInit() {
    // @ts-ignore
    this.totalSum = this.selectedServices.reduce((sum, service) => sum + service.price, 0);
  }

  onButtonClick() {
    this.buttonClick.emit();
  }
}

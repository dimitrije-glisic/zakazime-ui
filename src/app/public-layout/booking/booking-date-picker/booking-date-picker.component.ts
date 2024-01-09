import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../booking.service';
import {Service} from "../../../openapi";

@Component({
  selector: 'app-booking-date-picker',
  templateUrl: './booking-date-picker.component.html',
  styleUrls: ['./booking-date-picker.component.css']
})
export class BookingDatePickerComponent {

  weekDates: Date[] = [];
  availableSlots: string[] = [];
  selectedDate: Date = new Date();
  monthLabel: string = '';

  selectedServices: Service[] = [];
  totalSum: number = 0;

  businessName: string = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private bookingService: BookingService) {
    // http://localhost:4200/booking/HealthHub/confirm-booking
    //extract the business name from the url (HealthHub)
    // this.businessName = this.activatedRoute.snapshot.paramMap.get('business-name') ?? '';
    this.businessName = this.bookingService.getBusinessId();
    console.log(`businessName: ${this.businessName}`);
  }

  ngOnInit() {
    this.loadWeekDates(new Date());
    this.loadSelectedServices();
  }

  loadSelectedServices() {
    this.selectedServices = this.bookingService.getSelectedServices();
  }

  loadWeekDates(startingDate: Date) {
    this.weekDates = this.getWeekDates(startingDate);
    this.setMonthLabel();
  }

  getWeekDates(startingDate: Date): Date[] {
    return Array.from({ length: 7 }).map((_, index) => {
      const date = new Date(startingDate);
      date.setDate(date.getDate() + index);
      return date;
    });
  }

  setMonthLabel() {
    const firstDate = this.weekDates[0];
    const lastDate = this.weekDates[this.weekDates.length - 1];
    const firstMonth = formatDate(firstDate, 'MMM y', 'en-US');
    const lastMonth = formatDate(lastDate, 'MMM y', 'en-US');
    this.monthLabel = firstMonth;

    if (firstMonth !== lastMonth) {
      this.monthLabel += ' - ' + lastMonth;
    }
  }

  // private getMockAvailableSlots(dates: Date[]): { [key: string]: string[] } {
  //   let mockSlots: { [key: string]: string[] } = {};
  //   dates.forEach(date => {
  //     // Convert each date to a string key
  //     const dateString = date.toISOString().split('T')[0];
  //     mockSlots[dateString] = ['09:00', '10:00', '11:00', '14:00', '15:00'];
  //   });
  //   return mockSlots;
  // }

  getAvailableSlots(date: Date): string[] {
    //do not use date for now, just return a mock array of times
    // Replace with actual logic in the future
    //return random array of times
    const array1 = ['09:00', '10:00', '11:00'];
    const array2 = ['14:00', '15:00', '16:00', '17:00', '18:00'];
    const array3: string[] = [];

    const random = Math.floor(Math.random() * 3) + 1;
    if (random === 1) {
      return array1;
    } else if (random === 2) {
      return array2;
    } else {
      return array3;
    }
  }

  selectDate(date: Date) {
    // Logic to select a date and load available time slots for that date
    this.selectedDate = date;
    this.availableSlots = this.getAvailableSlots(date);
  }

  isSelectedDate(date: Date): boolean {
    return this.dateString(date) === this.dateString(this.selectedDate);
  }

  navigateWeeks(step: number) {
    const currentStartDate = this.weekDates[0];
    const newStartDate = new Date(currentStartDate);
    newStartDate.setDate(newStartDate.getDate() + step * 7);
    this.loadWeekDates(newStartDate);
  }

  // Convert Date to a string key for indexing
  dateString(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }

  // Check if there are available slots for a date
  hasAvailableSlots(date: Date): boolean {
    const dateString = this.dateString(date);
    // return this.availableSlots[dateString] && this.availableSlots[dateString].length > 0;
    const slots = this.getAvailableSlots(date);
    return slots.length > 0;
  }

  calculateTotalSum() {
    // @ts-ignore
    this.totalSum = this.selectedServices.reduce((sum, service) => sum + service.price, 0);
  }

  selectTimeSlot(slot: string) {
    this.bookingService.setSelectedTime(slot);
  }

  getSelectedTimeSlot() {
    return this.bookingService.getSelectedTime();
  }

  continueToConfirmation() {
    // Navigate to confirm page with necessary data
    this.router.navigate(['../confirm-booking'], { relativeTo: this.activatedRoute });
  }

}

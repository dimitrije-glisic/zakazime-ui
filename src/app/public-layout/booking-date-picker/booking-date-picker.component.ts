import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Service } from 'src/app/interfaces/service.interface';

@Component({
  selector: 'app-booking-date-picker',
  templateUrl: './booking-date-picker.component.html',
  styleUrls: ['./booking-date-picker.component.css']
})
export class BookingDatePickerComponent {

  weekDates: Date[] = [];
  availableSlots: { [key: string]: string[] } = {}; // Holds available slots for each day
  selectedDate: Date = new Date();
  monthLabel: string = '';

  selectedServices: { name: string, price: number }[] = [];
  totalSum: number = 0;
  selectedTime: string | null = null;
  isTimeSelected: boolean = false;

  businessName: string = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    // http://localhost:4200/booking/HealthHub/confirm-booking
    //extract the business name from the url (HealthHub)
    this.activatedRoute.url.subscribe(url => {
      this.businessName = url[1].path;
      console.log(this.businessName);
    });
  }

  ngOnInit() {
    this.loadWeekDates(new Date());
    this.loadSelectedServices();
  }

  loadSelectedServices() {
    // Replace with actual logic
    this.selectedServices = [
      { name: 'Service 1', price: 50 },
      { name: 'Service 2', price: 75 }
    ];
  }

  loadWeekDates(startingDate: Date) {
    this.weekDates = this.getWeekDates(startingDate);
    this.setMonthLabel();
    this.availableSlots = this.getMockAvailableSlots(this.weekDates);
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

  // getAvailableSlots(dates: Date[]): { [key: string]: string[] } {
  // Call backend to get available slots
  // This function should return an object with dates as keys and arrays of time slots as values
  // }

  private getMockAvailableSlots(dates: Date[]): { [key: string]: string[] } {
    let mockSlots: { [key: string]: string[] } = {};
    dates.forEach(date => {
      // Convert each date to a string key
      const dateString = date.toISOString().split('T')[0];
      // Generate mock slots (assuming the format is "HH:mm")
      mockSlots[dateString] = ['09:00', '10:00', '11:00', '14:00', '15:00'];
    });
    return mockSlots;
  }

  selectDate(date: Date) {
    // Logic to select a date and load available time slots for that date
    this.selectedDate = date;
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
    return this.availableSlots[dateString] && this.availableSlots[dateString].length > 0;
  }

  calculateTotalSum() {
    this.totalSum = this.selectedServices.reduce((sum, service) => sum + service.price, 0);
  }

  selectTimeSlot(slot: string) {
    this.selectedTime = slot;
    this.isTimeSelected = true;
  }

  continueToConfirmation() {
    // Navigate to confirm page with necessary data
    this.router.navigate(['../confirm-booking'], { relativeTo: this.activatedRoute });
  }

}

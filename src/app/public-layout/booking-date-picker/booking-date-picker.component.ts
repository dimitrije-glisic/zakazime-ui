import { formatDate } from '@angular/common';
import { Component } from '@angular/core';

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

  ngOnInit() {
    this.loadWeekDates(new Date());
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

  selectTimeSlot(slot: string) {
    console.log('Time slot selected:', slot);
    // Implement logic to handle time slot selection
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

}

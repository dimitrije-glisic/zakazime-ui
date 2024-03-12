import {formatDate} from '@angular/common';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-booking-date-picker',
  templateUrl: './booking-date-picker.component.html',
  styleUrls: ['./booking-date-picker.component.css']
})
export class BookingDatePickerComponent implements OnInit {

  weekDates: Date[] = [];
  selectedDate: Date = new Date();
  @Output() dateSelected = new EventEmitter<Date>();
  monthLabel: string = '';

  ngOnInit() {
    this.loadWeekDates(new Date());
  }

  loadWeekDates(startingDate: Date) {
    this.weekDates = this.getWeekDates(startingDate);
    this.setMonthLabel();
  }

  getWeekDates(startingDate: Date): Date[] {
    return Array.from({length: 7}).map((_, index) => {
      const date = new Date(startingDate);
      date.setDate(date.getDate() + index);
      return date;
    });
  }

  setMonthLabel() {
    const firstDate = this.weekDates[0];
    const lastDate = this.weekDates[this.weekDates.length - 1];
    const firstMonth = formatDate(firstDate, 'MMMM y.', 'sr-Latn');
    const lastMonth = formatDate(lastDate, 'MMMM y.', 'sr-Latn');
    this.monthLabel = firstMonth;

    if (firstMonth !== lastMonth) {
      this.monthLabel += ' - ' + lastMonth;
    }
  }

  selectDate(date: Date) {
    // Logic to select a date and load available time slots for that date
    this.selectedDate = date;
    this.dateSelected.emit(date);
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
    return formatDate(date, 'yyyy-MM-dd', 'sr-Latn');
  }


}

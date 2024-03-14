import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrl: './calendar-header.component.css'
})
export class CalendarHeaderComponent {
  // @ts-ignore
  @Input() view: CalendarView;

  // @ts-ignore
  @Input() viewDate: Date;

  @Input() locale: string = 'sr-Latn';

  @Output() viewChange = new EventEmitter<CalendarView>();

  @Output() viewDateChange = new EventEmitter<Date>();

  CalendarView = CalendarView;
}

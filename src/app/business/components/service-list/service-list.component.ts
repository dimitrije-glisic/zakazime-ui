import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Service} from "../../../interfaces/service";

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent {
  _services: Service[] | undefined;
  @Input() set services(services: Service[] | undefined) {
    this._services = services;
  }

  @Output() editEvent = new EventEmitter<Service>();
  @Output() deleteEvent = new EventEmitter<number>(); // Emitting only the ID for deletion

  constructor() {
  }

  onEdit($event: Service) {
    this.editEvent.emit($event);
  }

  onDelete($event: number) {
    this.deleteEvent.emit($event);
  }
}

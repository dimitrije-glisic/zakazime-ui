import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Service} from "../../../interfaces/service";

@Component({
  selector: 'app-service-list-item',
  templateUrl: './service-list-item.component.html',
  styleUrls: ['./service-list-item.component.css']
})
export class ServiceListItemComponent {
  @Input() service: Service | undefined;
  @Output() edit = new EventEmitter<Service>();
  @Output() delete = new EventEmitter<number>(); // Emitting only the ID for deletion

  onEdit() {
    this.edit.emit(this.service);
  }

  onDelete() {
    this.delete.emit(this.service!.id);
  }

}

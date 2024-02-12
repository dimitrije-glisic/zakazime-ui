import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserDefinedCategory} from "../../../../interfaces/user-defined-category";
import {MatDialog} from "@angular/material/dialog";
import {AddServiceModalComponent} from "../add-service-modal/add-service-modal.component";
import {Service} from "../../../../interfaces/service";
import {BusinessService} from "../../../services/business-service";
import {EditServiceModalComponent} from "../edit-service-modal/edit-service-modal.component";

@Component({
  selector: 'app-user-defined-category-list',
  templateUrl: './user-defined-category-list.component.html',
  styleUrls: ['./user-defined-category-list.component.css']
})
export class UserDefinedCategoryListComponent {

  @Input() categories: UserDefinedCategory[] = [];

  @Output() startEditing = new EventEmitter<UserDefinedCategory>();
  @Output() onDelete = new EventEmitter<number>();
  expandedCategory: UserDefinedCategory | null = null;
  expandedServices: Service[] | undefined;

  constructor(
    private dialog: MatDialog,
    private businessService: BusinessService
  ) {
  }

  startEdit(serviceCategory: UserDefinedCategory) {
    this.startEditing.emit(serviceCategory);
  }

  delete(id: number) {
    this.onDelete.emit(id);
  }

  toggleExpand(category: UserDefinedCategory) {
    if (this.expandedCategory === category) {
      this.expandedCategory = null;
    } else {
      this.expandedCategory = category;
      this.businessService.getServices().subscribe(
        services => this.expandedServices = services.filter(s => s.categoryId === category.id)
      );
    }
  }

  openAddModal(category: UserDefinedCategory) {
    const dialogRef = this.dialog.open(AddServiceModalComponent, {
      width: '500px',
      data: {category: category}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.businessService.loadServices().subscribe(
        services => {
          if (this.expandedCategory) {
            this.expandedServices = services.filter(s => s.categoryId === this.expandedCategory!.id)
          } else {
            // do nothing, just load new services
          }
        }
      );
    });
  }

  openEditModal($event: Service) {
    //open modal to edit service
    const dialogRef = this.dialog.open(EditServiceModalComponent, {
      width: '500px',
      data: {service: $event}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.businessService.loadServices().subscribe(
        services => this.expandedServices = services.filter(s => s.categoryId === this.expandedCategory!.id)
      );
    });
  }

  deleteService($event: number) {
    this.businessService.deleteService($event).subscribe(
      () => {
        this.businessService.loadServices().subscribe(
          services => this.expandedServices = services.filter(s => s.categoryId === this.expandedCategory!.id)
        )
      }
    );
  }
}


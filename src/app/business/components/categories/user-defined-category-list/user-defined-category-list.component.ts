import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserDefinedCategory} from "../../../../interfaces/user-defined-category";
import {UserDefinedCategoryService} from "../../../services/user-defined-category.service";
import {MatDialog} from "@angular/material/dialog";
import {AddServiceModalComponent} from "../add-service-modal/add-service-modal.component";

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

  constructor(
    private categoryService: UserDefinedCategoryService,
    private dialog: MatDialog
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
    }
  }

  openAddModal(category: UserDefinedCategory) {
    const dialogRef = this.dialog.open(AddServiceModalComponent, {
      width: '500px',
      data: {category: category}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }
}


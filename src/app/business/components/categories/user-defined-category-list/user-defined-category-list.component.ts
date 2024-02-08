import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PredefinedCategory} from "../../../../interfaces/predefined-category";
import {UserDefinedCategory} from "../../../../interfaces/user-defined-category";
import {UserDefinedCategoryService} from "../../../services/user-defined-category.service";

@Component({
  selector: 'app-user-defined-category-list',
  templateUrl: './user-defined-category-list.component.html',
  styleUrls: ['./user-defined-category-list.component.css']
})
export class UserDefinedCategoryListComponent {

  @Input() categories: UserDefinedCategory[] = [];

  @Output() startEditing = new EventEmitter<UserDefinedCategory>();
  @Output() onDelete = new EventEmitter<number>();

  constructor(
    private categoryService: UserDefinedCategoryService,
  ) {
  }

  startEdit(serviceCategory: UserDefinedCategory) {
    this.startEditing.emit(serviceCategory);
  }

  delete(id: number) {
    this.onDelete.emit(id);
  }

}


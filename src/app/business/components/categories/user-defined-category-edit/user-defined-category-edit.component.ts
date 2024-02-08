import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserDefinedCategory} from "../../../../interfaces/user-defined-category";
import {UserDefinedCategoryService} from "../../../services/user-defined-category.service";
import {UpdateUserDefinedCategoryRequest} from "../../../../interfaces/update-user-defined-category-request";
import {PredefinedCategory} from "../../../../interfaces/predefined-category";

@Component({
  selector: 'app-user-defined-category-edit',
  templateUrl: './user-defined-category-edit.component.html',
  styleUrls: ['./user-defined-category-edit.component.css']
})
export class UserDefinedCategoryEditComponent {
  editForm: FormGroup;
  _category: UserDefinedCategory | null = null;
  @Input() set category(category: UserDefinedCategory) {
    this._category = category;
    if (this.editForm) {
      this.editForm.patchValue(category);
    }
  }

  @Output() categoryUpdated = new EventEmitter<UpdateUserDefinedCategoryRequest>();
  @Output() cancelEdit = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onEditSubmit() {
    this.categoryUpdated.emit(this.editForm.value);
    this.editForm.reset();
  }

}

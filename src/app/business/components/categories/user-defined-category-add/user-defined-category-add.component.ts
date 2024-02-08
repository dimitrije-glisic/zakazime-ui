import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserDefinedCategory} from "../../../../interfaces/user-defined-category";

@Component({
  selector: 'app-user-defined-category-add',
  templateUrl: './user-defined-category-add.component.html',
  styleUrls: ['./user-defined-category-add.component.css']
})
export class UserDefinedCategoryAddComponent {

  addForm: FormGroup;
  @Output() onAdd = new EventEmitter<UserDefinedCategory>();

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.addForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onAddSubmit() {
    this.onAdd.emit(this.addForm.value);
    this.addForm.reset();
  }

}

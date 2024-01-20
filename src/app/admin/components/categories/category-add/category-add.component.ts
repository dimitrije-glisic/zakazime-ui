import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServiceCategory} from "../../../../interfaces/service-category";
import {BusinessType} from "../../../../interfaces/business-type";

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent {
  // a list of business types to be used in the select element
  @Input() businessTypes: BusinessType[] | null = null;
  addForm: FormGroup;
  selectedImage: File | null = null;
  @Output() onAdd = new EventEmitter<ServiceCategory | FormData>();

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.addForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      businessTypeId: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
  }

  onAddSubmit() {
    if (this.selectedImage) {
      const formData = new FormData();
      formData.append('image', this.selectedImage);
      // Convert the form data to a blob and append it to the FormData object
      const categoryBlob = new Blob([JSON.stringify(this.addForm.value)], {
        type: 'application/json'
      });
      formData.append('category', categoryBlob);
      this.selectedImage = null;
      this.onAdd.emit(formData);
      this.addForm.reset();

    } else {
      console.log(this.addForm.value);
      this.onAdd.emit(this.addForm.value as ServiceCategory);
      this.addForm.reset();
    }
  }

  handleImageChange(event: Event) {
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      this.selectedImage = file;
    }
  }
}

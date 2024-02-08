import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PredefinedCategory} from "../../../../interfaces/predefined-category";
import {PredefinedCategoryService} from "../../../services/predefined-category.service";
import {BusinessType} from "../../../../interfaces/business-type";

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent {
  editForm: FormGroup;
  selectedImage: File | null = null;
  _category: PredefinedCategory | null = null;
  @Input() set category(category: PredefinedCategory) {
    this._category = category;
    if (this.editForm) {
      this.editForm.patchValue(category);
    }
  }

  @Input() businessTypes: BusinessType[] | null = null;
  @Output() categoryUpdated = new EventEmitter<void>();
  @Output() cancelEdit = new EventEmitter<void>();

  constructor(
    private categoryService: PredefinedCategoryService,
    private formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onEditSubmit() {
    console.log('selectedImage: ', this.selectedImage);
    const resetFormAndEmit = () => {
      this.editForm.reset();
      this._category = null;
      this.selectedImage = null;
      this.categoryUpdated.emit();
    };

    console.log(' selectedImage: ', this.selectedImage);
    if (this.selectedImage) {
      console.log(' update with image: ', this.selectedImage);
      const formData = new FormData();
      formData.append('image', this.selectedImage);
      formData.append('category', new Blob([JSON.stringify(this.editForm.value)], {type: 'application/json'}));
      this.categoryService.updateWithImage(this._category!.id, formData).subscribe(resetFormAndEmit, error => {
        // Handle any errors
      });
    } else {
      console.log(' update without image: ', this.editForm.value);
      this.categoryService.update(this._category!.id, this.editForm.value).subscribe(resetFormAndEmit);
    }
  }

  handleImageChange(event: Event) {
    console.log(' handleImageChange: ', event);
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      this.selectedImage = file;
    }
  }



}

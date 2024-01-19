import {Component, EventEmitter, Output} from '@angular/core';
import {BusinessTypeService} from "../../../services/business-type.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-business-type-add',
  templateUrl: './business-type-add.component.html',
  styleUrls: ['./business-type-add.component.css']
})
export class BusinessTypeAddComponent {

  addForm: FormGroup;
  selectedImage: File | null = null;
  @Output() businessTypeAdded = new EventEmitter<void>();

  constructor(
    private businessTypeService: BusinessTypeService,
    private formBuilder: FormBuilder
  ) {
    this.addForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      imageUrl: ['', Validators.required],
    });
  }

  onAddSubmit() {
    console.log('onAddSubmit', this.addForm.value);
    if (this.selectedImage) {
      const formData = new FormData();
      formData.append('image', this.selectedImage);

      // Convert the form data to a blob and append it to the FormData object
      const businessTypeBlob = new Blob([JSON.stringify(this.addForm.value)], {
        type: 'application/json'
      });
      formData.append('businessType', businessTypeBlob);

      this.businessTypeService.createBusinessTypeWithImage(formData).subscribe(
        res => {
          this.addForm.reset();
          this.selectedImage = null;
          this.businessTypeAdded.emit();
        },
        error => {
          // Handle any errors
        }
      );
    } else {
      this.businessTypeService.createBusinessType(this.addForm.value)
        .subscribe(() => {
          this.addForm.reset();
          this.businessTypeAdded.emit();
        });
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

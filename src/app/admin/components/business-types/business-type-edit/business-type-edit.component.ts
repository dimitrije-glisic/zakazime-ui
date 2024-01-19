import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BusinessTypeService} from "../../../services/business-type.service";
import {BusinessType} from "../../../../interfaces/business-type";

@Component({
  selector: 'app-business-type-edit',
  templateUrl: './business-type-edit.component.html',
  styleUrls: ['./business-type-edit.component.css']
})
export class BusinessTypeEditComponent {

  editForm: FormGroup;
  selectedImage: File | null = null;
  @Input() businessType: BusinessType | null = null;
  @Output() businessTypeUpdated = new EventEmitter<void>();
  @Output() cancelEdit = new EventEmitter<void>();

  constructor(
    private businessTypeService: BusinessTypeService,
    private formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      id: [''],
      title: ['', [Validators.required, Validators.minLength(3)]],
      imageUrl: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.businessType) {
      this.editForm.patchValue(this.businessType);
    }
  }

  ngOnChanges() {
    if (this.businessType) {
      this.editForm.patchValue(this.businessType);
    }
  }

  onEditSubmit() {
    if (this.selectedImage) {
      const formData = new FormData();
      formData.append('image', this.selectedImage);

      // Convert the form data to a blob and append it to the FormData object
      const businessTypeBlob = new Blob([JSON.stringify(this.editForm.value)], {
        type: 'application/json'
      });
      formData.append('businessType', businessTypeBlob);

      this.businessTypeService.updateBusinessTypeWithImage(this.editForm.value.id, formData).subscribe(
        res => {
          // this.loadBusinessTypes();
          this.editForm.reset();
          this.businessType = null;
          this.selectedImage = null; // Reset the image file
          this.businessTypeUpdated.emit();
        },
        error => {
          // Handle any errors
        }
      );
    } else {
      // image must be provided
      this.businessTypeService.updateBusinessType(this.editForm.value.id, this.editForm.value)
        .subscribe(() => {
          // this.loadBusinessTypes();
          this.editForm.reset();
          this.businessType = null;
          this.businessTypeUpdated.emit();
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

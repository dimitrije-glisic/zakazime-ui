import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BusinessType} from "../../../interfaces/business-type";
import {BusinessTypeService} from "../../services/business-type.service";

@Component({
  selector: 'app-business-type-list',
  templateUrl: './business-type-list.component.html',
  styleUrls: ['./business-type-list.component.css']
})
export class BusinessTypeListComponent implements OnInit {
  businessTypes: BusinessType[] = [];
  addForm: FormGroup;
  editForm: FormGroup;
  editingBusinessTypeId: number | null = null;
  selectedImage: File | null = null;
  expandedBusinessTypeId: number | null = null;

  constructor(
    private businessTypeService: BusinessTypeService,
    private formBuilder: FormBuilder
  ) {
    this.addForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      imageUrl: ['', Validators.required],
      // Add other fields as needed
    });

    this.editForm = this.formBuilder.group({
      id: [''],
      title: ['', [Validators.required, Validators.minLength(3)]],
      imageUrl: ['', Validators.required],
      // Add other fields as needed
    });
  }

  ngOnInit() {
    this.loadBusinessTypes();
  }

  loadBusinessTypes() {
    this.businessTypeService.getBusinessTypes().subscribe(data => {
      this.businessTypes = data;
    });
  }

  startEdit(businessType: BusinessType) {
    this.editingBusinessTypeId = businessType.id;
    this.editForm.patchValue(businessType);
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
          // Handle the response, the backend should return the created business type with ID and imageUrl
          this.loadBusinessTypes();
          this.addForm.reset();
          this.selectedImage = null; // Reset the image file
        },
        error => {
          // Handle any errors
        }
      );
    } else {
      // image must be provided
      this.addForm.setErrors({required: true});
    }
  }

  private createBusinessType(businessTypeData: BusinessType) {
    this.businessTypeService.createBusinessType(businessTypeData)
      .subscribe(() => {
        this.loadBusinessTypes();
        this.addForm.reset();
        this.selectedImage = null; // Reset the image file
      });
  }

  onEditSubmit() {
    this.businessTypeService.updateBusinessType(this.editForm.value.id, this.editForm.value)
      .subscribe(() => {
        this.loadBusinessTypes();
        this.editForm.reset();
        this.editingBusinessTypeId = null;
      });
  }

  deleteBusinessType(id: number) {
    this.businessTypeService.deleteBusinessType(id).subscribe(() => {
      this.loadBusinessTypes();
    });
  }

  handleImageChange(event: Event) {
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  toggleExpand(id: number) {
    if (this.expandedBusinessTypeId === id) {
      this.expandedBusinessTypeId = null;
    } else {
      this.expandedBusinessTypeId = id;
      const businessType = this.businessTypes.find(bt => bt.id === id);
      if (businessType) {
        this.loadBusinessTypeImage(businessType);
      }
    }
  }

  loadBusinessTypeImage(businessType: BusinessType) {
    this.businessTypeService.getBusinessTypeImage(businessType.id).subscribe(
      imageBlob => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          businessType.imageUrl = reader.result as string;
        }, false);

        if (imageBlob) {
          reader.readAsDataURL(imageBlob);
        }
      },
      error => {
        console.error('Error loading image:', error);
      }
    );
  }

}

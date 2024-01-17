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
    console.log('addForm', this.addForm.value);
    if (this.selectedImage) {
      console.log('selectedImage', this.selectedImage);
      console.log('addForm', this.addForm.value);
      const formData = new FormData();
      formData.append('image', this.selectedImage);

      this.businessTypeService.uploadImage(formData).subscribe(res => {
        console.log('received imageUrl', res.imageUrl);
        const imageUrl = res.imageUrl;
        console.log('title', this.addForm.value.title);
        const businessTypeData = {...this.addForm.value, imageUrl} as BusinessType;
        console.log('businessTypeData', businessTypeData);
        this.createBusinessType(businessTypeData);
      });
    } else {
      // image must be provided
      this.addForm.get('imageUrl')!.setErrors({required: true});
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

}

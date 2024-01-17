import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private businessTypeService: BusinessTypeService,
    private formBuilder: FormBuilder
  ) {
    this.addForm = this.formBuilder.group({
      title: ['', Validators.required, Validators.minLength(3)],
      // Add other fields as needed
    });

    this.editForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required, Validators.minLength(3)],
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
    this.businessTypeService.createBusinessType(this.addForm.value)
      .subscribe(() => {
        this.loadBusinessTypes();
        this.addForm.reset();
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
}

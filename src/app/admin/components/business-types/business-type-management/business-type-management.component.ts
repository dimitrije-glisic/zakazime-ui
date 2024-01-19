import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BusinessType} from "../../../../interfaces/business-type";
import {BusinessTypeService} from "../../../services/business-type.service";

@Component({
  selector: 'app-business-type-management',
  templateUrl: './business-type-management.component.html',
  styleUrls: ['./business-type-management.component.css']
})
export class BusinessTypeManagement implements OnInit {
  businessTypes: BusinessType[] = [];
  addForm: FormGroup;
  editingBusinessType: BusinessType | null = null;

  constructor(
    private businessTypeService: BusinessTypeService,
    private formBuilder: FormBuilder
  ) {
    this.addForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      imageUrl: ['', Validators.required],
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

}

import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserDefinedCategory} from "../../../../interfaces/user-defined-category";
import {BusinessService} from "../../../services/business-service";
import {Service} from "../../../../interfaces/service";

@Component({
  selector: 'app-add-service-modal',
  templateUrl: './add-service-modal.component.html',
  styleUrls: ['./add-service-modal.component.css']
})
export class AddServiceModalComponent {
  form: FormGroup;

  _category: UserDefinedCategory | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddServiceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private businessService: BusinessService) {

    this._category = data.category;

    this.form = this.fb.group({
      title: '',
      price: 0,
      avgDuration: 0,
      description: '',
    });
  }

  save() {
    const service = this.form.value as Service;
    service.categoryId = this._category!.id;
    this.businessService.addService(service).subscribe(
      () => this.close(),
      err => console.error('Error occurred while adding service', err)
    );
  }

  close() {
    this.dialogRef.close();
  }
}

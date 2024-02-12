import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BusinessService} from "../../../services/business-service";
import {Service} from "../../../../interfaces/service";

@Component({
  selector: 'app-edit-service-modal',
  templateUrl: './edit-service-modal.component.html',
  styleUrls: ['./edit-service-modal.component.css']
})
export class EditServiceModalComponent {
  form: FormGroup;

  _service: Service | undefined;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditServiceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { service: Service },
    private businessService: BusinessService) {

    this._service = data.service;

    this.form = this.fb.group({
      title: '',
      price: 0,
      avgDuration: 0,
      description: '',
    });

    this.form.patchValue(data.service);
  }

  update() {
    const service = this.form.value as Service;
    // do not allow category to be changed, for now
    service.id = this._service!.id;
    service.categoryId = this._service!.categoryId;
    this.businessService.updateService(service).subscribe(
      () => this.close(),
      err => console.error('Error occurred while editing service', err)
    );
  }

  close() {
    this.dialogRef.close();
  }
}

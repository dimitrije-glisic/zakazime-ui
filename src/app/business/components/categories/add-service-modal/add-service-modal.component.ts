import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserDefinedCategory} from "../../../../interfaces/user-defined-category";

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
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this._category = data.category;

    this.form = this.fb.group({
      title: '',
      price: 0,
      avgDuration: 0,
      description: '',
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}

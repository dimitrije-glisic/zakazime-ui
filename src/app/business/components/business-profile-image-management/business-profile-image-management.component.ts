import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-business-profile-image-management',
  templateUrl: './business-profile-image-management.component.html',
  styleUrls: ['./business-profile-image-management.component.css']
})
export class BusinessProfileImageManagementComponent {
  _profileImageUrl: string | undefined;
  @Input() set profileImageUrl(value: string | undefined) {
    this._profileImageUrl = value;
  }
  @Output() submitImage: EventEmitter<File> = new EventEmitter<File>();

  selectedImage: File | null = null;
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      // Define other form controls here
      profileImage: new FormControl(null)
    });
  }

  handleImageChange(event: Event) {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      this.selectedImage = element.files[0];
      this.form.patchValue({ profileImage: this.selectedImage });
    }
  }

  onSubmit() {
    // Your submission logic here
    if (this.selectedImage) {
      this.submitImage.emit(this.selectedImage);
    }
    // After successful submission, reset the form and file input
    this.form.reset();
    this.selectedImage = null;
    const fileInput = document.getElementById('profileImageInput') as HTMLInputElement;
    fileInput.value = ''; // Reset file input

  }
}

import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BusinessService} from "../../business/services/business-service";
import {CreateBusinessProfileRequest} from "../../interfaces/create-business-profile-request";
import {Business} from "../../interfaces/business";

@Component({
  selector: 'app-business-registration',
  templateUrl: './business-registration.component.html',
  styleUrl: './business-registration.component.css'
})
export class BusinessRegistrationComponent {

  businessRegistrationForm: FormGroup;

  serviceKinds = [
    {key: 'HAIR_SERVICES', value: 'Frizerske usluge'},
    {key: 'COSMETIC_SERVICES', value: 'Kozmetičke usluge'},
    {key: 'MASSAGE', value: 'Masaže'},
    {key: 'OTHER', value: 'Ostalo'}
  ]
  selectedServiceKinds: string[] = [];
  showSuccessAlert: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private businessService: BusinessService,
  ) {
    this.businessRegistrationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required]],
      contactPerson: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      yearOfEstablishment: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
    });
  }

  sendRequest() {
    const request: CreateBusinessProfileRequest = this.businessRegistrationForm.value;
    request.serviceKinds = this.selectedServiceKinds;
    this.businessService.createBusiness(request).subscribe((created: Business) => {
      this.businessRegistrationForm.reset();
      this.selectedServiceKinds = [];
      this.showSuccessAlert = true;
      setTimeout(() => this.showSuccessAlert = false, 5000);
    });
  }

  toggleServiceKind(serviceKindKey: string) {
    if (this.selectedServiceKinds.includes(serviceKindKey)) {
      this.selectedServiceKinds = this.selectedServiceKinds.filter(selectedSk => selectedSk !== serviceKindKey);
    } else {
      this.selectedServiceKinds.push(serviceKindKey);
    }
  }

}

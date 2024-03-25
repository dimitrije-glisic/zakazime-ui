import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BusinessService} from 'src/app/business/services/business-service';
import {CreateBusinessProfileRequest} from "../../interfaces/create-business-profile-request";
import {Business} from "../../interfaces/business";
import {Account} from "../../interfaces/account";
import {BusinessType} from "../../interfaces/business-type";
import {BusinessTypeService} from "../../admin/services/business-type.service";

@Component({
  selector: 'app-finish-registration',
  templateUrl: './finish-registration.component.html',
  styleUrls: ['./finish-registration.component.css']
})
export class FinishRegistrationComponent implements OnInit {

  finishRegistrationForm: FormGroup;
  loggedInUser: Account | undefined;
  businessTypes: BusinessType[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private businessService: BusinessService,
    private businessTypeService: BusinessTypeService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.finishRegistrationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
    this.route.queryParams.subscribe(params => {
      const data = params['email'];
    });
  }

  ngOnInit(): void {
    this.loggedInUser = this.authService.getCurrentUser();
    this.businessTypeService.getAll().subscribe((types: BusinessType[]) => {
      this.businessTypes = types;
    });
  }

  finishRegistration() {
    if (this.finishRegistrationForm.valid) {
      const business: CreateBusinessProfileRequest = this.finishRegistrationForm.value;
      if (!this.loggedInUser) {
        throw new Error('User not found');
      }
      this.businessService.createBusiness(business).subscribe((created: Business) => {
        console.log('business created', created);
        this.router.navigate(['/manage-business']);
      });
    } else {
      console.log('Form is invalid');
    }
  }

}

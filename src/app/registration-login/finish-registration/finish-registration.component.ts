import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Business } from 'src/app/interfaces/business.interface';
import { BusinessService } from 'src/app/business/services/business-service';
import { User } from 'src/app/interfaces/user.interface';
import { ServicesService } from 'src/app/services.service';
import {BusinessType} from "../../interfaces/business-type.interface";


@Component({
  selector: 'app-finish-registration',
  templateUrl: './finish-registration.component.html',
  styleUrls: ['./finish-registration.component.css']
})
export class FinishRegistrationComponent implements OnInit {

  finishRegistrationForm: FormGroup;
  loggedInUser: User | undefined;
  businessTypes: BusinessType[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private bs: BusinessService,
    private ss: ServicesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.finishRegistrationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      address: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
    this.route.queryParams.subscribe(params => {
      const data = params['email'];
    });
  }

  ngOnInit(): void {
    this.authService.fetchUser().subscribe((user: any) => {
      this.loggedInUser = user;
    });
    this.bs.getBusinessTypes().subscribe((types: BusinessType[]) => {
      this.businessTypes = types;
    });
  }

  finishRegistration() {
    if (this.finishRegistrationForm.valid) {
      const business: Business = this.finishRegistrationForm.value;
      if (!this.loggedInUser) {
        throw new Error('User not found');
      }
      business.ownerEmail = this.loggedInUser.email;
      this.bs.createBusiness(business).subscribe((created: Business) => {
        console.log('business created', created);
        this.router.navigate(['manage-business']);
      });
    } else {
      console.log('Form is invalid');
    }
  }

}

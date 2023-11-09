import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Business } from 'src/app/interfaces/business.interface';
import { BusinessService } from 'src/app/business.service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-finish-registration',
  templateUrl: './finish-registration.component.html',
  styleUrls: ['./finish-registration.component.css']
})
export class FinishRegistrationComponent {

  finishRegistrationForm: FormGroup;
  private userEmailAddress: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private bu: BusinessService,
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
      this.userEmailAddress = data;
    });
  }

  async finishRegistration() {
  //   if (this.finishRegistrationForm.valid) {
  //     try {
  //       const business: Business = this.finishRegistrationForm.value;
  //       const email = await firstValueFrom(this.authService.getUserEmail());
  //       business.ownerEmail = email;
  //       const response = await firstValueFrom(this.bu.createBusiness(business));
  //       console.log('finish registration successful', response);
  //       await this.router.navigate(['manage-business']);
  //     } catch (error) {
  //       console.error('finish registration failed', error);
  //     }
  //   } else {
  //     console.log('Form is invalid');
  //   }
  }

}

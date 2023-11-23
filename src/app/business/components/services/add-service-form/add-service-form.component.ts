import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BusinessService } from 'src/app/business/services/business-service';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-add-service-form',
  templateUrl: './add-service-form.component.html',
  styleUrls: ['./add-service-form.component.css']
})
export class AddServiceFormComponent {

  businessName: string | undefined;
  categories: string[] = [];
  serviceForm: FormGroup;

  constructor(private businessService: BusinessService, private servicesService: ServicesService, private router: Router) {
    this.serviceForm = new FormGroup({});
  }

  ngOnInit(): void {
    console.log('AddServiceFormComponent ngOnInit');
    this.serviceForm = new FormGroup({
      'name': new FormControl(null),
      'note': new FormControl(null),
      'description': new FormControl(null),
      'price': new FormControl(null),
      'avgDuration': new FormControl(null),
      'categoryName': new FormControl(null),
    });

    this.businessService.getBusiness().subscribe(business => {
      if (!business) {
        throw new Error('Business not found');
      }
      this.businessName = business.name;
      this.servicesService.getServiceTemplatesForBusinessType(business.type).subscribe(data => {
        console.log('getServiceTemplatesForBusinessType', data);
        this.categories = [...new Set(data.map(service => service.categoryName))];
      });

    });
  }

  onSubmit() {
    if (this.serviceForm.valid) {
      if (!this.businessName) {
        throw new Error('Business name not found');
      }
      
      console.log(`Trying to create service ${JSON.stringify(this.serviceForm.value)} for business ${this.businessName}`)

      this.servicesService.createService(this.serviceForm.value, this.businessName).subscribe(() => {
        this.businessService.addServicesLocally([this.serviceForm.value]);
        this.router.navigate(['manage-business', 'services']);
      });
    }
  }
}

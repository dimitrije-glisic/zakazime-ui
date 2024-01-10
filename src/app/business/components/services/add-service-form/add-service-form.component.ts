import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {BusinessService} from 'src/app/business/services/business-service';
import {ServicesService} from 'src/app/business/services/services.service';
import {Business} from "../../../../interfaces/business";
import {ServiceSubcategory} from "../../../../interfaces/service-subcategory";
import {SubcategoryService} from "../../../services/subcategory.service";

@Component({
  selector: 'app-add-service-form',
  templateUrl: './add-service-form.component.html',
  styleUrls: ['./add-service-form.component.css']
})
export class AddServiceFormComponent {

  business: Business | null = null;
  subcategories: ServiceSubcategory[] = [];
  serviceForm: FormGroup;

  constructor(private businessService: BusinessService, private servicesService: ServicesService, private subcategoryService: SubcategoryService,
              private router: Router) {
    this.serviceForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.serviceForm = new FormGroup({
      'title': new FormControl(null),
      'subcategoryId': new FormControl(null),
      'note': new FormControl(null),
      'description': new FormControl(null),
      'price': new FormControl(null),
      'avgDuration': new FormControl(null)
    });

    this.businessService.getBusiness().subscribe(business => {
        this.business = business;
        this.servicesService.getServiceTemplatesForBusinessType(business.typeId).subscribe(data => {
            console.log('getServiceTemplatesForBusinessType', data);
            // this.subcategories = [...new Set(data.map(service => '' + service.subcategoryId))];
            this.subcategoryService.getAll().subscribe(subcategories => {
              const subcategoryIds = [...new Set(data.map(service => service.subcategoryId))];
              this.subcategories = subcategories.filter(subcategory => subcategoryIds.includes(subcategory.id));
            });
          }
        );
      }
    );
  }

  onSubmit() {
    if (this.serviceForm.valid) {
      console.log(`Trying to create service ${JSON.stringify(this.serviceForm.value)} for business ${this.business?.name}`)
      this.servicesService.createService(this.serviceForm.value, this.business!.id).subscribe(() => {
        this.businessService.addServicesLocally([this.serviceForm.value]);
        this.router.navigate(['manage-business', 'services']);
      });
    }
  }
}

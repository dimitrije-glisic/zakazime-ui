import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {BusinessService} from 'src/app/business/services/business-service';
import {ServicesService} from 'src/app/business/services/services.service';
import {Business} from "../../../../interfaces/business";
import {switchMap} from "rxjs";
import {catchError} from "rxjs/operators";
import {Service} from "../../../../interfaces/service";
import {UserDefinedCategory} from "../../../../interfaces/user-defined-category";

@Component({
  selector: 'app-add-service-form',
  templateUrl: './add-service-form.component.html',
  styleUrls: ['./add-service-form.component.css']
})
export class AddServiceFormComponent {

  business: Business | undefined;
  categories: UserDefinedCategory[] = [];
  serviceForm: FormGroup;

  constructor(private businessService: BusinessService, private servicesService: ServicesService,
              private router: Router) {
    this.serviceForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.serviceForm = new FormGroup({
      'title': new FormControl(null),
      'categoryId': new FormControl(null),
      'description': new FormControl(null),
      'price': new FormControl(null),
      'avgDuration': new FormControl(null)
    });
    this.loadData();
  }

  loadData() {
    this.businessService.loadBusiness().pipe(
      switchMap(business => {
        this.business = business;
        return this.servicesService.getServiceTemplatesForBusinessType(business!.typeId);
      }),
      switchMap(serviceTemplates =>
        this.businessService.loadCategories()),
      catchError(error => {
        console.error('Error occurred', error);
        throw error;
      })
    ).subscribe(categories => {
      this.categories = categories;
    });
  }

  onSubmit() {
    if (this.serviceForm.valid) {
      const service: Service = this.serviceForm.value;
      console.log(`Service is ${JSON.stringify(service)}`);
      this.servicesService.createService(this.serviceForm.value, this.business!.id).subscribe(() => {
        this.businessService.addServicesLocally([this.serviceForm.value]);
        this.router.navigate(['manage-business', 'services']);
      });
    }
  }
}

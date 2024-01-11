import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BusinessService} from 'src/app/business/services/business-service';
import {ServicesService} from 'src/app/business/services/services.service';
import {Service} from "../../../../interfaces/service";
import {ServiceSubcategory} from "../../../../interfaces/service-subcategory";

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
})
export class EditServiceComponent implements OnInit {
  service: Service | undefined;
  serviceSubcategory: ServiceSubcategory | undefined;
  subcategories: ServiceSubcategory[] | undefined;
  serviceForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private businessService: BusinessService,
    private servicesService: ServicesService,
  ) {
    this.serviceForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const serviceId = params['id'];
      this.loadServiceAndCategories(serviceId)
    });
  }

  loadServiceAndCategories(id: string) {
    this.service = this.businessService.getService(id);
    if (!this.service) {
      throw new Error('Service not found');
    }

    this.subcategories = this.businessService.getSubcategories();
    if (!this.subcategories) {
      throw new Error('Subcategories not found');
    }

    this.serviceSubcategory = this.subcategories.find(subcategory => subcategory.id === this.service!.subcategoryId);
    if(!this.serviceSubcategory) {
      throw new Error('Service subcategory not found');
    }

    this.serviceForm = new FormGroup({
      'title': new FormControl(this.service.title),
      'note': new FormControl(this.service.note),
      'description': new FormControl(this.service.description),
      'price': new FormControl(this.service.price),
      'avgDuration': new FormControl(this.service.avgDuration),
      'subcategory': new FormControl(this.serviceSubcategory!.title),
    });

  }

  onSave(service: Service): void {
    if (!this.service) {
      throw new Error('Service not defined on edit-service.component.ts onSave()');
    }
    service.businessId = this.service.businessId;
    this.servicesService.updateService(service).subscribe(result => {
      this.businessService.updateServiceLocally(service);
      this.router.navigate(['/manage-business/services']);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessService } from 'src/app/business/services/business-service';
import { ServicesService } from 'src/app/services.service';
import {Service} from "../../../../openapi";

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
})
export class EditServiceComponent implements OnInit {
  service: Service | undefined;
  serviceForm: FormGroup;
  subcategories: string[] = [];

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
      console.log('EditServiceComponent ngOnInit', serviceId);
      this.loadServiceAndCategories(serviceId);
    });
  }

  loadServiceAndCategories(id: string) {
    this.businessService.getBusiness().subscribe(business => {
      // if (!business || !business.services) {
      if (!business) {
        throw new Error('Business not found with services');
      }

      // @ts-ignore
      this.service = business.services.find(service => service.id == id);

      if (!this.service) {
        throw new Error('Service not found');
      }

      this.serviceForm = new FormGroup({
        'name': new FormControl(this.service.title),
        'note': new FormControl(this.service.note),
        'description': new FormControl(this.service.description),
        'price': new FormControl(this.service.price),
        'avgDuration': new FormControl(this.service.avgDuration),
        'category': new FormControl(this.service.subcategoryId),
      });
      if (business.typeId != null) {
        this.loadCategories(business.typeId);
      }
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

  loadCategories(typeId: number) {
    return this.servicesService.getServiceTemplatesForBusinessType(typeId).subscribe(data => {
      this.subcategories = [...new Set(data.map(service => '' + service.subcategoryId))];
    }
    );
  }

}

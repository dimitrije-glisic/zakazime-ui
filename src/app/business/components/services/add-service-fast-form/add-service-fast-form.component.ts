import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ServicesService} from 'src/app/services.service';
import {BusinessService} from 'src/app/business/services/business-service';
import {Service} from "../../../../openapi";

@Component({
  selector: 'app-add-service-fast-form',
  templateUrl: './add-service-fast-form.component.html',
  styleUrls: ['./add-service-fast-form.component.css']
})
export class AddServiceFastFormComponent implements OnInit {
  existingServices: Service[] = [];

  subcategories: (number | undefined)[] = [];
  serviceTemplates: Service[] = [];
  selectedSubcategory: string | number | undefined;
  subcategoryServices: Service[] = [];
  userSelectedServices: Service[] = [];

  businessName: string | undefined;
  businessType: number | undefined;

  constructor(private http: HttpClient, private servicesService: ServicesService, private businessService: BusinessService,
              private router: Router) {
  }

  ngOnInit(): void {
    const businessType = this.businessService.getBusiness().subscribe(
      business => {
        if (!business) {
          throw new Error('Business not found');
        }
        //to do: make sure business type is not null
        if (!business.typeId) {
          throw new Error('Business type not found');
        }
        this.businessName = business.name;
        this.businessType = business.typeId;
        // this.existingServices = business.services;
        if (business.typeId == null) {
          throw new Error('Business type not found');
        }
        this.loadTemplates(business.typeId);
      }
    )
  }

  loadTemplates(businessType: number): void {
    this.servicesService.getServiceTemplatesForBusinessType(businessType).subscribe(data => {
      this.serviceTemplates = data.filter(service => !this.existingServices.some(existingService => existingService.title === service.title));
      this.subcategories = [...new Set(this.serviceTemplates.map(service => service.subcategoryId))];
      this.selectedSubcategory = this.subcategories[0];
      this.subcategoryServices = this.serviceTemplates
        .filter(service => service.subcategoryId === this.selectedSubcategory);
    });
  }

  onSubcategorySelect(event: Event): void {
    const selectElement = event.target;
    if (selectElement instanceof HTMLSelectElement) {
      this.selectedSubcategory = selectElement.value;
      this.subcategoryServices = this.serviceTemplates.filter(service => service.subcategoryId === this.selectedSubcategory);
      this.userSelectedServices = [];
    }
  }

  onServiceSelect(service: Service): void {
    if (!this.userSelectedServices.includes(service)) {
      this.userSelectedServices.push(service);
    }
  }

  onSaveServices(): void {
    if (!this.businessName) {
      throw new Error('Business name not found');
    }
    this.servicesService.createServices(this.userSelectedServices, this.businessName).subscribe(response => {
      console.log('Services created');
      this.businessService.addServicesLocally(this.userSelectedServices);
      this.router.navigate(['manage-business', 'services']);
    });
  }

}

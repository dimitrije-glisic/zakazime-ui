import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';
import { Service } from 'src/app/interfaces/service.interface';
import { BusinessService } from 'src/app/business/services/business-service';

@Component({
  selector: 'app-add-service-fast-form',
  templateUrl: './add-service-fast-form.component.html',
  styleUrls: ['./add-service-fast-form.component.css']
})
export class AddServiceFastFormComponent implements OnInit {
  existingServices: Service[] = [];

  categories: string[] = [];
  serviceTemplates: Service[] = [];
  selectedCategory: string | null = null;
  categoryServices: Service[] = [];
  userSelectedServices: Service[] = [];

  businessName: string | null = null;

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
        if (!business.type) {
          throw new Error('Business type not found');
        }
        this.businessName = business.name;
        this.existingServices = business.services;
        this.loadTemplates(business.type);
      }
    )
  }

  loadTemplates(businessType: string): void {
    this.servicesService.getServiceTemplatesForBusinessType(businessType).subscribe(data => {
      this.serviceTemplates = data.filter(service => !this.existingServices.some(existingService => existingService.name === service.name));
      this.categories = [...new Set(this.serviceTemplates.map(service => service.categoryName))];
      this.selectedCategory = this.categories[0];
      this.categoryServices = this.serviceTemplates
        .filter(service => service.categoryName === this.selectedCategory);
    });
  }

  onCategorySelect(event: Event): void {
    const selectElement = event.target;
    if (selectElement instanceof HTMLSelectElement) {
      this.selectedCategory = selectElement.value;
      this.categoryServices = this.serviceTemplates.filter(service => service.categoryName === this.selectedCategory);
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

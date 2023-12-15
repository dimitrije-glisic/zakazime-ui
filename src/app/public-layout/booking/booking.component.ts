import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessServiceMockService } from 'src/app/business-service-mock.service';
import { Business } from 'src/app/interfaces/business.interface';
import { Service } from 'src/app/interfaces/service.interface';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  business: Business = {} as Business;

  services: Service[] = [];

  subcategories: string[];
  filteredSubcategories: string[] = [];
  selectedServices: Service[] = [];

  constructor(private route: ActivatedRoute, private businessServiceMock: BusinessServiceMockService,
    private router: Router) {
    const businessId = this.route.snapshot.paramMap.get('business-name');
    this.business = this.businessServiceMock.getBusinesses().find(b => b.name === businessId) as Business;
    this.services = this.business.services;
    this.subcategories = [...new Set(this.business.services.map(s => s.subCategoryName))];
  }

  filterBySubcategory(subcategory: any) {
    this.filteredSubcategories = this.subcategories.filter(s => s === subcategory);
  }

  addService(service: Service) {
    this.selectedServices.push(service);
  }

  removeService(service: Service) {
    this.selectedServices = this.selectedServices.filter(s => s !== service);
  }

  scrollToSubcategory(subcategory: string): void {
    const element = document.getElementById(`subcategory-${subcategory}`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  pickTime() {
    console.log('pick time');
    this.router.navigate(['booking', this.business.name, 'pick-time'], { queryParams: { services: this.selectedServices} });
  }

}

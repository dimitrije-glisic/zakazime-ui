import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BookingService} from '../booking.service';
import {Business} from "../../../interfaces/business";
import {Service} from "../../../interfaces/service";
import {ServiceSubcategory} from "../../../interfaces/service-subcategory";

@Component({
  selector: 'app-booking-select-services',
  templateUrl: './booking-select-services.component.html',
  styleUrls: ['./booking-select-services.component.css']
})
export class BookingSelectServicesComponent {
  business: Business = {} as Business;
  services: Service[] = [];
  subcategories: ServiceSubcategory[];
  filteredSubcategories: string[] = [];
  businessName: string = '';

  constructor(private route: ActivatedRoute, private bookingService: BookingService) {
    this.businessName = this.route.snapshot.paramMap.get('business-name') ?? '';
    this.bookingService.setBusinessId(this.businessName);
    // this.business = this.businessServiceMock.getBusinesses().find(b => b.name === this.businessName) as Business;
    this.business = {} as Business;
    // this.services = this.business.services;
    this.services = [];
    // this.subcategories = [...new Set(this.business.services.map(s => loadSubcategory(s)))];
    this.subcategories = [];
  }

  ngOnInit() {
    this.businessName = this.route.snapshot.paramMap.get('business-name') ?? '';
  }

  getSelectedServices() {
    return this.bookingService.getSelectedServices();
  }

  filterBySubcategory(subcategory: any) {
    // this.filteredSubcategories = this.subcategories.filter(s => s === subcategory);
  }

  addService(service: Service) {
    this.bookingService.addService(service);
  }

  removeService(service: Service) {
    this.bookingService.removeService(service);
  }

  scrollToSubcategory(subcategory: string): void {
    const element = document.getElementById(`subcategory-${subcategory}`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  pickTime() {
    this.bookingService.navigateToTimePicker();
  }

}

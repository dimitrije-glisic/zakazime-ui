import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BusinessService} from "../../business/services/business-service";
import {BusinessRichObject} from "../../interfaces/business-rich-object";
import {Service} from "../../interfaces/service";
import {UserDefinedCategory} from "../../interfaces/user-defined-category";
import {BookingService} from "../booking/services/booking.service";

@Component({
  selector: 'app-business-select-services',
  templateUrl: './business-select-services.component.html',
  styleUrls: ['./business-select-services.component.css']
})
export class BusinessSelectServices implements OnInit {

  city: string | undefined;
  businessName: string | undefined;
  businessRichObj: BusinessRichObject | undefined;

  categoriesWithServices: Map<UserDefinedCategory, Service[]> = new Map<UserDefinedCategory, Service[]>();

  textFilter = '';
  categoryFilter: number | undefined;

  showPicker = false;

  constructor(private activatedRoute: ActivatedRoute, private businessService: BusinessService, private bookingService: BookingService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const {city, 'business-name': businessName} = params;
      this.city = city;
      this.businessName = businessName;
      this.loadBusinessData(city, businessName);
    });
  }

  loadBusinessData(city: string, businessName: string): void {
    this.businessService.loadRichBusinessObject(city, businessName).subscribe(business => {
      this.businessRichObj = business;
      this.updateCategoriesWithServices();
    });
  }

  private updateCategoriesWithServices() {
    this.categoriesWithServices.clear();
    this.businessRichObj!.userDefinedCategories.forEach(category => {
      const services = this.businessRichObj!.services.filter(service => service.categoryId === category.id);
      this.categoriesWithServices.set(category, services);
    });
  }

  scrollToCategory(categoryTitle: string) {
    const targetElement = document.getElementById('category-' + categoryTitle);
    if (targetElement) {
      targetElement.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }

  selectService(service: Service) {
    if (this.bookingService.getSelectedServices().find(s => s.id === service.id)) {
      this.bookingService.removeService(service);
      if (this.bookingService.getSelectedServices().length === 0) {
        this.showPicker = false;
      }
    } else {
      this.bookingService.addService(service);
      this.showPicker = true;
    }
  }

  getSelectedServices() {
    return this.bookingService.getSelectedServices();
  }

  getTotalAmount() {
    return this.bookingService.getSelectedServices().reduce((acc, s) => acc + s.price, 0);
  }

  isServiceSelected(id: number) {
    return this.bookingService.getSelectedServices().find(s => s.id === id);
  }

  openTimePicker() {
    this.router.navigate(['checkout', 'cart'], {relativeTo: this.activatedRoute});
  }
}

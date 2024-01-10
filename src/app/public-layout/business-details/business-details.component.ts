import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Business} from "../../interfaces/business";

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.css']
})
export class BusinessDetailsComponent {

  business: Business = {} as Business
  testimonials: any[] = [];

  searchTerm: string = '';

  servicesGroupedBySubCategory: any = {};

  constructor(private router: Router) {
    //provide some mock data (message, clientName)
    this.testimonials = [
      {
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non felis sit amet diam aliquam ultrices. Sed in nulla at justo commodo luctus. Donec quis nisi in tortor mattis commodo. Nulla facilisi. Sed auctor, nisl eu ultricies aliquet, magna nunc tincidunt sem, nec commodo sapien nisi a justo. Sed et turpis sit amet nisl ullamcorper aliquam. Nulla facilisi. Vivamus vitae arcu sit amet nisi rutrum viverra. Sed sed semper velit. Sed nec nisl ut nisi vulputate ultricies. Sed nec semper diam. Etiam euismod, nisl quis convallis vehicula, nulla augue aliquet justo, a aliquam nisi justo vitae quam. Etiam sit amet est eget ipsum aliquet aliquet. Sed nec semper diam. Etiam euismod, nisl quis convallis vehicula, nulla augue aliquet justo, a aliquam nisi justo vitae quam. Etiam sit amet est eget ipsum aliquet aliquet.',
        clientName: 'John Doe'
      },
      {
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non felis sit amet diam aliquam ultrices. Sed in nulla at justo commodo luctus. Donec quis nisi in tortor mattis commodo. Nulla facilisi. Sed auctor, nisl eu ultricies aliquet, magna nunc tincidunt sem, nec commodo sapien nisi a justo. Sed et turpis sit amet nisl ullamcorper aliquam. Nulla facilisi. Vivamus vitae arcu sit amet nisi rutrum viverra. Sed sed semper velit. Sed nec nisl ut nisi vulputate ultricies. Sed nec semper diam. Etiam euismod, nisl quis convallis vehicula, nulla augue aliquet justo, a aliquam nisi justo vitae quam. Etiam sit amet est eget ipsum aliquet aliquet. Sed nec semper diam. Etiam euismod, nisl quis convallis vehicula, nulla augue aliquet justo, a aliquam nisi justo vitae quam. Etiam sit amet est eget ipsum aliquet aliquet.',
        clientName: 'Jane Doe'
      }
    ];

  }

  ngOnInit(): void {
    console.log('BusinessDetailsComponent ngOnInit');
    // this.business = this.businessServiceMock.getBusinesses()[0];
    this.business = {} as Business;

    this.groupServicesBySubcategory();
  }

  groupServicesBySubcategory() {
    // this.business.services.forEach((service: Service) => {
    //   if (!this.servicesGroupedBySubCategory[service.subCategoryName]) {
    //     this.servicesGroupedBySubCategory[service.subCategoryName] = [];
    //   }
    //   this.servicesGroupedBySubCategory[service.subCategoryName].push(service);
    // });
  }

  getSubCategoryKeys() {
    return Object.keys(this.servicesGroupedBySubCategory);
  }


  filterServices(searchTerm: string, services: any[]): any[] {
      if (!searchTerm) return services;
      return services.filter(service => service.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  openServicesPage() {
  }

  navigateToBooking() {
    this.router.navigate(['/booking/HealthHub/select-services']); // Adjust the route as needed
  }


}

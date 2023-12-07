import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services.service';
import { Service } from 'src/app/interfaces/service.interface';
import { ServicesFilterPipe } from '../services-filter.pipe';
import { BusinessService } from 'src/app/business/services/business-service';

@Component({
  selector: 'app-business-services',
  templateUrl: './business-services.component.html',
  styleUrls: ['./business-services.component.css']
})
export class BusinessServicesComponent implements OnInit {

  services: Service[] = [];
  categories: string[] = [];
  currentPage = 1;
  itemsPerPage = 10;

  textFilter = '';
  categoryFilter = '';

  newService: Service = {
    id: '',
    name: '',
    description: '',
    price: 0,
    avgDuration: 0,
    categoryName: '',
    subCategoryName: '',
  };

  constructor(private businessService: BusinessService, private servicesService: ServicesService) { }

  ngOnInit(): void {
    this.businessService.getBusiness().subscribe(business => {
      if (!business) {
        throw new Error('Business not found');
      }
      console.log(business.services);
      this.services = business.services;
      this.categories = [...new Set(this.services.map(service => service.categoryName))];
    });
  }

}

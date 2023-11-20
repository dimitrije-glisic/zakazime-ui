import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services.service';
import { Service } from 'src/app/interfaces/service.interface';
import { ServicesFilterPipe } from '../filter-name.pipe';
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
    name: '',
    description: '',
    price: 0,
    avgDuration: 0,
    categoryName: ''
  };

  constructor(private businessService: BusinessService, private servicesService: ServicesService) { }

  ngOnInit(): void {
    this.businessService.getBusiness().subscribe(business => {
      if (!business) {
        throw new Error('Business not found');
      }
      this.servicesService.getServices(business.name).subscribe(services => {
        this.services = services;
        this.categories = [...new Set(this.services.map(service => service.categoryName))];
      });
    });
  }

}

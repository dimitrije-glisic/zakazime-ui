import {Component, OnInit} from '@angular/core';
import {BusinessService} from 'src/app/business/services/business-service';
import {Service} from "../../../../openapi";

@Component({
  selector: 'app-business-services',
  templateUrl: './business-services.component.html',
  styleUrls: ['./business-services.component.css']
})
export class BusinessServicesComponent implements OnInit {

  services: Service[] = [];
  subCategories: string[] = [];
  currentPage = 1;
  itemsPerPage = 10;

  textFilter = '';
  categoryFilter = '';

  constructor(private businessService: BusinessService) {
  }

  ngOnInit(): void {
    this.businessService.getBusiness().subscribe(business => {
      if (!business) {
        throw new Error('Business not found');
      }
      console.log(business.services);
      this.services = business.services;
      this.subCategories = this.loadSubcategories(this.services);
    });
  }

   loadSubcategories(services: Service[]) {
    return [];
  }

}

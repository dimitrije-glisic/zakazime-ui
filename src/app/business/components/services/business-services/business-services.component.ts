import {Component, OnInit} from '@angular/core';
import {BusinessService} from 'src/app/business/services/business-service';
import {ServiceSubcategory} from "../../../../interfaces/service-subcategory";
import {Service} from "../../../../interfaces/service";
import {UserDefinedCategoryService} from "../../../services/user-defined-category.service";
import {UserDefinedCategory} from 'src/app/interfaces/user-defined-category';

@Component({
  selector: 'app-business-services',
  templateUrl: './business-services.component.html',
  styleUrls: ['./business-services.component.css']
})
export class BusinessServicesComponent implements OnInit {

  services: Service[] = [];
  subcategories: ServiceSubcategory[] = [];
  currentPage = 1;
  itemsPerPage = 10;

  textFilter = '';
  subcategoryFilter: number | undefined;

  businessId: number | undefined;

  constructor(private businessService: BusinessService) {
  }

  ngOnInit(): void {
    this.businessService.loadBusiness().subscribe(business => {
      this.businessId = business!.id;
      this.loadServices(business!.id);
    });
  }

  loadServices(id: number) {
    this.businessService.getServices().subscribe(
      (services: Service[]) => {
        this.services = services;
        this.businessService.loadCategories(); // Call loadSubcategories here after services are loaded
      },
      (error: any) => {
        console.error('Error fetching services:', error);
      }
    );
  }

}

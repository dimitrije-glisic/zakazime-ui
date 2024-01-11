import {Component, OnInit} from '@angular/core';
import {BusinessService} from 'src/app/business/services/business-service';
import {SubcategoryService} from "../../../services/subcategory.service";
import {ServiceSubcategory} from "../../../../interfaces/service-subcategory";
import {Service} from "../../../../interfaces/service";

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
  subcategoryFilter : number | undefined;

  constructor(private businessService: BusinessService, private subcategoryService: SubcategoryService) {
  }

  ngOnInit(): void {
    this.businessService.loadBusiness().subscribe(business => {
      this.loadServices(business.id);
    });
  }

  loadServices(id: number) {
    this.businessService.loadServices(id).subscribe(
      (services: Service[]) => {
        this.services = services;
        this.loadSubcategories(services); // Call loadSubcategories here after services are loaded
      },
      (error: any) => {
        console.error('Error fetching services:', error);
      }
    );
  }

  loadSubcategories(services: Service[]): void {
    const serviceSubcategoryIds = new Set(services.map(service => service.subcategoryId));
    this.businessService.loadSubcategories(serviceSubcategoryIds).subscribe(subcategories => {
        this.subcategories = subcategories;
      },
      (error: any) => {
        // Handle the error appropriately
        console.error('Error fetching subcategories:', error);
      }
    );
  }

  findSubCategory(subcategoryId: number): ServiceSubcategory {
    return this.subcategories.find(subcategory => subcategory.id === subcategoryId)!;
  }
}

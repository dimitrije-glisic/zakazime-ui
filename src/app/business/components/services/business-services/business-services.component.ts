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
  categoryFilter = '';

  constructor(private businessService: BusinessService, private subcategoryService: SubcategoryService) {
  }

  ngOnInit(): void {
    this.businessService.getBusiness().subscribe(business => {
      if (!business) {
        throw new Error('Business not found');
      }
      console.log(business);
      if (business.id != null) {
        this.loadServices(business.id)
      } else {
        throw new Error('Business id not found');
      }
      this.loadSubcategories(this.services);
    });
  }


  loadSubcategories(services: Service[]): void {
    this.subcategoryService.getAll().subscribe(subcategories => {
        const serviceSubcategoryIds = new Set(services.map(service => service.subcategoryId));
        this.subcategories = subcategories!.filter(subcategory => serviceSubcategoryIds.has(subcategory.id));
      },
      (error: any) => {
        // Handle the error appropriately
        console.error('Error fetching subcategories:', error);
      }
    );
  }

  private loadServices(id: number) {
    this.businessService.getServicesOfBusiness(id).subscribe(
      (services: Service[]) => {
        this.services = services;
      },
      (error: any) => {
        // Handle the error appropriately
        console.error('Error fetching services:', error);
      }
    );
  }
}

import {Component, OnInit} from '@angular/core';
import {BusinessService} from 'src/app/business/services/business-service';
import {Service} from "../../../interfaces/service";

@Component({
  selector: 'app-service-management',
  templateUrl: './service-management.component.html',
  styleUrls: ['./service-management.component.css']
})
export class ServiceManagementComponent implements OnInit {

  services: Service[] = [];
  businessId: number | undefined;

  constructor(private businessService: BusinessService) {
  }

  ngOnInit(): void {
    this.businessService.getBusinessCached().subscribe(business => {
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

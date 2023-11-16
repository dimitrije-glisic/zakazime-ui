import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services.service';
import { Service } from 'src/app/interfaces/service.interface';

@Component({
  selector: 'app-business-services',
  templateUrl: './business-services.component.html',
  styleUrls: ['./business-services.component.css']
})
export class BusinessServicesComponent implements OnInit {

  services: Service[] = [];
  // pagedServices: Service[] = [];
  currentPage = 1;
  itemsPerPage = 10;

  newService: Service = {
    name: '',
    description: '',
    price: 0,
    avgDuration: 0,
    category: ''
  };

  constructor(private businessService: ServicesService) { }

  ngOnInit(): void {
    // Fetch the list of services on init
    this.businessService.getServices().subscribe(services => {
      this.services = services;
      // this.pagedServices = this.services.slice(0, this.itemsPerPage);
    });
  }

  // pageChange(event: any): void {
    // this.currentPage = event.page;
    // const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    // const endIndex = startIndex + this.itemsPerPage;
    // this.pagedServices = this.services.slice(startIndex, endIndex);
  // }

}

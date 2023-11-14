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
    });
  }

}

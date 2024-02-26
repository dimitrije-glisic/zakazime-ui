import {Component, OnInit} from '@angular/core';
import {BusinessService} from "../../../../business/services/business-service";
import {Business} from "../../../../interfaces/business";

@Component({
  selector: 'app-businesses-management',
  templateUrl: './businesses-management.component.html',
  styleUrl: './businesses-management.component.css'
})
export class BusinessesManagementComponent implements OnInit {

  businesses: Business[] = [];

  constructor(private businessService: BusinessService) {
  }

  ngOnInit(): void {
    this.businessService.getAllCached().subscribe(businesses => this.businesses = businesses);
  }

}

import { Component } from '@angular/core';
import { BusinessService } from '../../services/business-service';
import {Business} from "../../../openapi";

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css']
})
export class BusinessProfileComponent {
  business: Business | undefined;

  constructor(private businessService: BusinessService) { }

  ngOnInit(): void {
    this.businessService.getBusiness().subscribe(business => {
      if (business) {
        this.business = business;
      } else {
        throw new Error('Business not found');
      }
    });
  }

}

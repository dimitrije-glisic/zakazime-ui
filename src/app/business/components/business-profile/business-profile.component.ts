import { Component } from '@angular/core';
import { Business } from 'src/app/interfaces/business.interface';
import { BusinessService } from '../../services/business-service';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css']
})
export class BusinessProfileComponent {
  business: Business = {
    name: '',
    type: '',
    phone: '',
    city: '', 
    postalCode: '',
    address: '',
    status: '',
    ownerEmail: '',
    services: [],
  };

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

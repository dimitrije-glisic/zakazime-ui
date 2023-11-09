import { Component } from '@angular/core';
import { BusinessService } from '../business.service';
import { Business } from '../interfaces/business.interface';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent {

  business: Business = { name: '', address: '', city: '', postalCode: '', phoneNumber: '', ownerEmail: '', status: '' };

  constructor(private businessService: BusinessService) { }

  ngOnInit(): void {
    this.getBusiness();
  }

  getBusiness(): void {
    this.businessService.getBusiness().subscribe(
      (data) => {
        this.business = data;
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

}

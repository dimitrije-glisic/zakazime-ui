import { Component } from '@angular/core';
import { BusinessServiceMockService } from 'src/app/business-service-mock.service';
import { Business } from 'src/app/interfaces/business.interface';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.css']
})
export class BusinessDetailsComponent {

  business: Business = {} as Business

  constructor(private businessServiceMock: BusinessServiceMockService) { 
    console.log('BusinessDetailsComponent constructor');
  }

  ngOnInit(): void {
    console.log('BusinessDetailsComponent ngOnInit');
    this.business = this.businessServiceMock.getBusinesses()[0];
  }

}

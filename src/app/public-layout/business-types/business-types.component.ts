import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessType } from 'src/app/interfaces/business-type.interface';

@Component({
  selector: 'app-business-types',
  templateUrl: './business-types.component.html',
  styleUrls: ['./business-types.component.css']
})
export class BusinessTypesComponent {

  businessTypes: BusinessType[] = [
    {
      title: 'Ulepsavanje',
      imageUrl: 'assets/images/beauty.jpg'
    },
    {
      title: 'Medicina',
      imageUrl: 'assets/images/health.jpg'
    },
    {
      title: 'Drugo',
      imageUrl: 'assets/images/inprogress.jpg'
    },
  ];

  constructor(private router: Router) { }

  onBusinessTypeClick(type: BusinessType) {
    console.log('onBusinessTypeClick', type);
    this.router.navigate(['/business-type', type.title.toLowerCase()]);
  }
}

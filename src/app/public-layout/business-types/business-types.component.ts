import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessType } from 'src/app/interfaces/business-type.interface';

@Component({
  selector: 'app-business-types',
  templateUrl: './business-types.component.html',
  styleUrls: ['./business-types.component.css']
})
export class BusinessTypesComponent {
  backgroundImg = '/assets/images/gradient.jpeg';
  title = 'Dobrodosli na ZakaziMe';
  subtitle = 'Pronadjite najbolju uslugu za svoje potrebe';

  businessTypes: BusinessType[] = [
    {
      id:1,
      title: 'Ulepsavanje',
      imageUrl: 'assets/images/beauty.jpg'
    },
    {
      id:2,
      title: 'Medicina',
      imageUrl: 'assets/images/health.jpg'
    },
    {
      id:3,
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

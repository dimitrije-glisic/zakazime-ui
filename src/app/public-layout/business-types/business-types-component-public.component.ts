import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {BusinessType} from "../../interfaces/business-type";

@Component({
  selector: 'app-business-type-management',
  templateUrl: './business-types-component-public.component.html',
  styleUrls: ['./business-types-component-public.component.css']
})
export class BusinessTypesComponent {
  backgroundImg = '/assets/images/gradient.jpeg';
  title = 'Dobrodosli na ZakaziMe';
  subtitle = 'Pronadjite najbolju uslugu za svoje potrebe';

  businessTypes: BusinessType[] = [
    {
      id: 1,
      title: 'Ulepsavanje',
      slug: 'ulepsavanje',
      imageUrl: 'assets/images/beauty.jpg'
    },
    {
      id: 2,
      title: 'Medicina',
      slug: 'medicina',
      imageUrl: 'assets/images/health.jpg'
    },
    {
      id: 3,
      title: 'Drugo',
      slug: 'drugo',
      imageUrl: 'assets/images/inprogress.jpg'
    },
  ];

  constructor(private router: Router) {
  }

  onBusinessTypeClick(type: BusinessType) {
    console.log('onBusinessTypeClick', type);
    this.router.navigate(['/business-type', type.title.toLowerCase()]);
  }
}

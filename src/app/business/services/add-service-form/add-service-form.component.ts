import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-add-service-form',
  templateUrl: './add-service-form.component.html',
  styleUrls: ['./add-service-form.component.css']
})
export class AddServiceFormComponent {

  mockCategories: string[] = [
    'Sisanje',
    'Depilacija',
    'Nokti',
    'Sminka',
    'Masaza'
  ]

  serviceForm: FormGroup;

  constructor(private businessService: ServicesService, private router: Router) {
    this.serviceForm = new FormGroup({});
  }

  ngOnInit(): void {
    console.log('AddServiceFormComponent ngOnInit');
    this.serviceForm = new FormGroup({
      'name': new FormControl(null),
      'note': new FormControl(null),
      'description': new FormControl(null),
      'price': new FormControl(null),
      'avgDuration': new FormControl(null),
      'category': new FormControl(null),
    });
  }

  onSubmit() {
    console.log(this.serviceForm.value);
    if (this.serviceForm.valid) {
      this.businessService.createService(this.serviceForm.value).subscribe(response => {
        this.router.navigate(['manage-business', 'services']);
      });
    }
  }
}

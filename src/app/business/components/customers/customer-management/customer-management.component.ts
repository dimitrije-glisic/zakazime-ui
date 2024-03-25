import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Business} from "../../../../interfaces/business";
import {BusinessService} from "../../../services/business-service";
import {Router} from "@angular/router";
import {CustomerService} from "../../../services/customer.service";
import {CustomerData} from "../../../../interfaces/customer-data";
import {Customer} from "../../../../interfaces/customer";

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrl: './customer-management.component.css'
})
export class CustomerManagementComponent {

  addForm: FormGroup;

  business: Business | undefined;
  customers: Customer[] = [];
  searchTerm: string = '';
  filteredCustomers: Customer[] = [];

  constructor(private customerService: CustomerService, private businessService: BusinessService, private formBuilder: FormBuilder,
              private router: Router) {
    this.addForm = this.formBuilder.group({
      fname: [''],
      lname: [''],
      email: [''],
      phone: ['']
    });
  }

  ngOnInit() {
    this.businessService.getBusinessCached().subscribe(business => {
      this.business = business;
      this.customerService.getCustomers(business!.id).subscribe(customers => {
        this.customers = customers;
        this.filteredCustomers = customers;
      });
    });
  }

  onAddSubmit() {
    const businessId = this.business!.id;
    this.customerService.createCustomer(businessId, this.addForm.value as CustomerData).subscribe((e) => {
      console.log('Cu created:', e);
      this.customerService.getCustomers(businessId).subscribe(customers => {
        console.log('C:', customers);
        this.customers = customers;
      });
    });
  }

  onSearch() {
    if (!this.searchTerm) {
      this.filteredCustomers = this.customers;
    } else {
      this.filteredCustomers = this.customers.filter(customer =>
        customer.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        customer.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        customer.phone.includes(this.searchTerm)
      );
    }
  }

  onCustomerClick(customer: CustomerData) {
    console.log('Employee clicked:', customer);
  }

  detailsCustomer(customer: Customer) {
    this.router.navigate(['manage-business/customers', customer.id]);
  }

}

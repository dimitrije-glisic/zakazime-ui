import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {CustomerService} from "../../../services/customer.service";
import {BusinessService} from "../../../services/business-service";
import {Customer} from "../../../../interfaces/customer";

@Component({
  selector: 'app-search-customers',
  templateUrl: './search-customers.component.html',
  styleUrl: './search-customers.component.css'
})
export class SearchCustomersComponent implements OnInit {
  @Output() customerSelected = new EventEmitter<Customer>();
  customers: Customer[] | undefined;
  filteredCustomers: Customer[] | undefined;

  constructor(private businessService: BusinessService, private customerService: CustomerService) {
  }

  ngOnInit() {
    this.businessService.getBusinessCached().subscribe(business => {
      this.customerService.getCustomers(business!.id).subscribe(customers => {
        this.customers = customers;
        this.filteredCustomers = [];
      });
    });
  }

  onSearchChange(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;
    this.filteredCustomers = this.customers?.filter(customer =>
      customer.firstName.includes(searchValue) ||
      customer.lastName.includes(searchValue) ||
      customer.phone.includes(searchValue)
    );
  }

  onCustomerSelect(customer: Customer): void {
    this.customerSelected.emit(customer);
    // Reset the search input
    this.filteredCustomers = []; // Clear the search results
    const searchInput = <HTMLInputElement>document.getElementById('customerSearch');
    searchInput.value = ''; // Clear the input field
  }
}

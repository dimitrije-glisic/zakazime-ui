import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BusinessService} from "../../../services/business-service";
import {ActivatedRoute} from "@angular/router";
import {CustomerRichObject} from "../../../../interfaces/customer-rich-object";
import {CustomerService} from "../../../services/customer.service";

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrl: './customer-page.component.css'
})
export class CustomerPageComponent implements OnInit {
  customer: CustomerRichObject | undefined;
  businessId: number | undefined;
  customerId: number;
  editForm: FormGroup;
  showEdit: boolean = false;

  constructor(private customerService: CustomerService, private businessService: BusinessService,
              private activeRoute: ActivatedRoute, private formBuilder: FormBuilder) {
    this.customerId = this.activeRoute.snapshot.params['customerId'];
    this.editForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: ['']
    });
  }

  ngOnInit(): void {
    this.businessService.getBusinessCached().subscribe(business => {
      this.businessId = business!.id;
      this.customerService.getCustomerFull(this.businessId, this.customerId).subscribe(customer => {
        console.log('Customer:', customer);
        this.customer = customer;
      });
    });
  }

  onEditClick() {
    this.showEdit = !this.showEdit;
    if (this.showEdit) {
      this.populateForm();
    }
  }

  onEditSubmit() {
    this.customerService.updateCustomer(this.businessId!, this.customerId, this.editForm.value).subscribe((e) => {
      //dont load appointments again
      this.customerService.getCustomer(this.businessId!, this.customerId).subscribe(customer => {
        this.customer!.customerData = customer;
      });
    });
  }

  private populateForm() {
    // Populate the form with the employee details (name, email, and phone)
    this.editForm.patchValue({
      firstName: this.customer!.customerData.firstName,
      lastName: this.customer!.customerData.lastName,
      email: this.customer!.customerData.email,
      phone: this.customer!.customerData.phone
    });
  }

}

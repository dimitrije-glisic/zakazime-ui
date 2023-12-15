import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-booking-breadcrumb',
  templateUrl: './booking-breadcrumb.component.html',
  styleUrls: ['./booking-breadcrumb.component.css']
})
export class BookingBreadcrumbComponent {
  @Input({ required: true }) currentStep!: string;
  @Input({ required: true }) businessName!: string;

  steps = [
    { label: 'Select Services', route: '', action: 'select-services' },
    { label: 'Choose Time', route: '', action: 'pick-time' },
    { label: 'Confirm Booking', route: '', action: 'confirm-booking' }
  ];

  ngOnInit() {
    // setup businessName in route for each step
    this.steps.forEach(step => {
      step.route = `/booking/${this.businessName}/${step.action}`;
    });

    console.log(this.steps);
  }

  isCurrentStep(stepKey: string): boolean {
    return this.currentStep === stepKey;
  }

  canNavigateBack(stepKey: string): boolean {
    console.log('canNavigateBack');
    console.log(stepKey);

    const stepOrder = ['select-services', 'pick-time', 'confirm-booking'];
    return stepOrder.indexOf(stepKey) < stepOrder.indexOf(this.currentStep);
  }

}

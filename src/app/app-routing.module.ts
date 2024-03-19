import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BusinessDashboardComponent} from './business/components/business-dashboard/business-dashboard.component';
import {ServiceManagementComponent} from './business/components/service-management/service-management.component';
import {BusinessProfileComponent} from './business/components/business-profile/business-profile.component';
import {IsBusinessUser} from './is-business-user';
import {BookingDatePickerComponent} from './public-layout/booking/booking-date-picker/booking-date-picker.component';
import {ConfirmBookingComponent} from './public-layout/booking/confirm-booking/confirm-booking.component';
import {DashboardComponent} from "./admin/components/dashboard/dashboard.component";
import {
  BusinessTypeManagement
} from "./admin/components/business-types/business-type-management/business-type-management.component";
import {
  CategoryManagementComponent
} from "./admin/components/categories/category-management/category-management.component";

import {DiscoverComponent} from "./public-layout/discover/discover.component";
import {LoginComponent} from "./registration-login/login/login.component";
import {FinishRegistrationComponent} from "./registration-login/finish-registration/finish-registration.component";
import {BusinessesOverviewComponent} from "./public-layout/businesses-overview/businesses-overview.component";
import {BusinessMainPageComponent} from "./public-layout/business-main-page/business-main-page.component";
import {RegistrationComponent} from "./registration-login/registration/registration.component";
import {ProfileComponent} from "./registration-login/profile/profile.component";
import {
  BusinessesManagementComponent
} from "./admin/components/businesses/businesses-management/businesses-management.component";
import {
  BusinessRegistrationComponent
} from "./registration-login/business-registration/business-registration.component";
import {
  EmployeeManagementComponent
} from "./business/components/employees/employee-management/employee-management.component";
import {EmployeeDetailsComponent} from "./business/components/employees/employee-details/employee-details.component";
import {BookingManagementComponent} from "./public-layout/booking/booking-management/booking-management.component";
import {
  BookingConfirmationComponent
} from "./public-layout/booking/booking-confirmation/booking-confirmation.component";
import {
  AppointmentCalendarComponent
} from "./business/components/calendar/appointment-calendar/appointment-calendar.component";
import {
  AppointmentManagementComponent
} from "./business/components/calendar/appointment-management/appointment-management.component";
import {CustomerPageComponent} from "./business/components/customers/customer-page/customer-page.component";
import {CustomerDetailsComponent} from "./business/components/customers/customer-details/customer-details.component";
import {
  CustomerManagementComponent
} from "./business/components/customers/customer-management/customer-management.component";

const routes: Routes = [
  {path: 'booking/:business-name/pick-time', component: BookingDatePickerComponent},

  {path: 'booking/:business-name/confirm-booking', component: ConfirmBookingComponent},

  {
    path: 'manage-business', component: BusinessDashboardComponent, canActivate: [IsBusinessUser],
    children: [
      {path: '', component: BusinessProfileComponent},
      {path: 'home', component: BusinessProfileComponent},
      {path: 'services', component: ServiceManagementComponent},
      {path: 'employees', component: EmployeeManagementComponent},
      {path: 'employees/:employeeId', component: EmployeeDetailsComponent},
      {path: 'customers', component: CustomerManagementComponent},
      {path: 'customers/:customerId', component: CustomerPageComponent},
      {path: 'appointments', component: AppointmentCalendarComponent},
      {path: 'appointmentsNew', component: AppointmentManagementComponent}
    ]
  },

  {
    path: 'admin', component: DashboardComponent,
    children: [
      {path: 'templates/business-types', component: BusinessTypeManagement},
      {path: 'templates/categories', component: CategoryManagementComponent},
      {path: 'businesses', component: BusinessesManagementComponent},
    ]
  },

  {path: '', component: DiscoverComponent},

  {path: 'become-partner', component: BusinessRegistrationComponent},

  {path: 'login', component: LoginComponent},

  {path: 'me/register', component: RegistrationComponent},

  {path: 'me', component: ProfileComponent},

  {path: 'finish-registration', component: FinishRegistrationComponent},

  //================================================================================================

  {path: 'discover/:city/svi-saloni', component: BusinessesOverviewComponent},

  {path: 'discover/:city/:business-type', component: BusinessesOverviewComponent},

  {path: 'discover/:city/:business-type/:category', component: BusinessesOverviewComponent},

  {path: 'business/:city/:business-name', component: BusinessMainPageComponent},

  {path: 'business/:city/:business-name/checkout/cart', component: BookingManagementComponent},

  {path: 'business/:city/:business-name/checkout/confirmation', component: BookingConfirmationComponent},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

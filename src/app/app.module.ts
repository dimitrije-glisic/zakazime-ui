import {Injectable, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegistrationComponent} from './registration-login/registration/registration.component';
import {LoginComponent} from './registration-login/login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {FinishRegistrationComponent} from './registration-login/finish-registration/finish-registration.component';
import {AuthService} from "./auth.service";
import {BusinessDashboardComponent} from './business/components/business-dashboard/business-dashboard.component';
import {ServiceManagementComponent} from './business/components/service-management/service-management.component';
import {ServicesFilterPipe} from './business/components/services/services-filter.pipe';
import {BusinessProfileComponent} from './business/components/business-profile/business-profile.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NavbarComponent} from './public-layout/legacy/navbar/navbar.component';
import {FilterByCategoryPipe} from './public-layout/legacy/filter-by-subcategory.pipe';
import {BookingDatePickerComponent} from './public-layout/booking/booking-date-picker/booking-date-picker.component';
import {ConfirmBookingComponent} from './public-layout/booking/confirm-booking/confirm-booking.component';
import {BookingSummaryComponent} from './public-layout/booking/booking-summary/booking-summary.component';
import {BookingBreadcrumbComponent} from './public-layout/booking/booking-breadcrumb/booking-breadcrumb.component';
import {DashboardComponent} from './admin/components/dashboard/dashboard.component';
import {
  BusinessTypeListComponent
} from './admin/components/business-types/business-type-list/business-type-list.component';
import {NgOptimizedImage, registerLocaleData} from "@angular/common";
import {
  BusinessTypeAddComponent
} from './admin/components/business-types/business-type-add/business-type-add.component';
import {
  BusinessTypeEditComponent
} from './admin/components/business-types/business-type-edit/business-type-edit.component';
import {
  BusinessTypeManagement
} from './admin/components/business-types/business-type-management/business-type-management.component';
import {
  CategoryManagementComponent
} from './admin/components/categories/category-management/category-management.component';
import {CategoryListComponent} from './admin/components/categories/category-list/category-list.component';
import {CategoryAddComponent} from './admin/components/categories/category-add/category-add.component';
import {CategoryEditComponent} from './admin/components/categories/category-edit/category-edit.component';
import {AddSearchCategoryComponent} from './business/components/add-search-category/add-search-category.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {
  SearchCategoryListComponent
} from './business/components/predefined-category-list/search-category-list.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {
  UserDefinedCategoryListComponent
} from './business/components/categories/user-defined-category-list/user-defined-category-list.component';
import {
  UserDefinedCategoryManagementComponent
} from "./business/components/categories/user-defined-category-management/user-defined-category-management.component";
import {
  UserDefinedCategoryAddComponent
} from './business/components/categories/user-defined-category-add/user-defined-category-add.component';
import {
  UserDefinedCategoryEditComponent
} from './business/components/categories/user-defined-category-edit/user-defined-category-edit.component';
import {ServiceListComponent} from './business/components/service-list/service-list.component';
import {AddServiceModalComponent} from './business/components/categories/add-service-modal/add-service-modal.component';
import {MatButtonModule} from "@angular/material/button";
import {ServiceListItemComponent} from './business/components/service-list-item/service-list-item.component';
import {MatIconModule} from "@angular/material/icon";
import {
  EditServiceModalComponent
} from './business/components/categories/edit-service-modal/edit-service-modal.component';
import {DiscoverComponent} from './public-layout/discover/discover.component';
import {BusinessesOverviewComponent} from './public-layout/businesses-overview/businesses-overview.component';
import {
  BusinessProfileImageManagementComponent
} from './business/components/business-profile-image-management/business-profile-image-management.component';
import {
  BusinessProfileSummaryComponent
} from './public-layout/business-profile-summary/business-profile-summary.component';
import {
  BusinessesFilterModalComponent
} from './public-layout/businesses-filter-modal/businesses-filter-modal.component';
import {BusinessFilterComponent} from './public-layout/business-filter/business-filter.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {BusinessMainPageComponent} from './public-layout/business-main-page/business-main-page.component';
import {ProfileComponent} from './registration-login/profile/profile.component';
import {
  BusinessesWaitingForApprovalComponent
} from "./admin/components/businesses/businesses-waiting-for-approval/businesses-waiting-for-approval.component";
import {
  ConfirmationModalComponent
} from "./admin/components/businesses/confirmation-modal/confirmation-modal.component";
import {
  BusinessesManagementComponent
} from "./admin/components/businesses/businesses-management/businesses-management.component";
import {BusinessesListComponent} from "./admin/components/businesses/businesses-list/businesses-list.component";
import {
  BusinessRegistrationComponent
} from "./registration-login/business-registration/business-registration.component";
import {
  EmployeeManagementComponent
} from "./business/components/employees/employee-management/employee-management.component";
import {
  EmployeeWorkingHoursComponent
} from "./business/components/employees/employee-working-hours/employee-working-hours.component";
import {EmployeeDetailsComponent} from "./business/components/employees/employee-details/employee-details.component";
import {
  ServiceEmployeePairComponent
} from "./public-layout/booking/service-employee-pair/service-employee-pair.component";
import {BookingManagementComponent} from "./public-layout/booking/booking-management/booking-management.component";
import {AvailableSlotsComponent} from "./public-layout/booking/available-slots/available-slots.component";
import {MatOption, MatSelect} from "@angular/material/select";
import localeSrLatn from '@angular/common/locales/sr-Latn';
import {
  BookingConfirmationComponent
} from "./public-layout/booking/booking-confirmation/booking-confirmation.component";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {
  AppointmentCalendarComponent
} from "./business/components/calendar/appointment-calendar/appointment-calendar.component";
import {CalendarHeaderComponent} from "./business/components/calendar/calendar-header/calendar-header.component";
import {
  AppointmentManagementComponent
} from "./business/components/calendar/appointment-management/appointment-management.component";
import {CustomerManagementComponent} from "./business/components/customers/customer-management/customer-management.component";
import {CustomerDetailsComponent} from "./business/components/customers/customer-details/customer-details.component";
import {CustomerPageComponent} from "./business/components/customers/customer-page/customer-page.component";
import {
  CreateAppointmentModalComponent
} from "./business/components/calendar/create-appointment-modal/create-appointment-modal.component";
import {SearchCustomersComponent} from "./business/components/calendar/search-customers/search-customers.component";
import {
  CreateAppointmentFormComponent
} from "./business/components/calendar/create-appointment-form/create-appointment-form.component";
import {
  AppointmentInfoModalComponent
} from "./business/components/calendar/appointment-info-modal/appointment-info-modal.component";
import {AppointmentComponent} from "./public-layout/appointment/appointment.component";
import {
  AppointmentDetailsComponent
} from "./business/components/calendar/appointment-details/appointment-details.component";
import {
  AppointmentStatusChangeComponent
} from "./business/components/calendar/appointment-status-change/appointment-status-change.component";
import {LeaveReviewModalComponent} from "./public-layout/leave-review-modal/leave-review-modal.component";

registerLocaleData(localeSrLatn, 'sr-Latn');

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    FinishRegistrationComponent,
    BusinessDashboardComponent,
    ServiceManagementComponent,
    ServicesFilterPipe,
    BusinessProfileComponent,
    NavbarComponent,
    FilterByCategoryPipe,
    BookingDatePickerComponent,
    ConfirmBookingComponent,
    BookingSummaryComponent,
    BookingBreadcrumbComponent,
    DashboardComponent,
    BusinessTypeListComponent,
    BusinessTypeAddComponent,
    BusinessTypeEditComponent,
    BusinessTypeManagement,
    CategoryManagementComponent,
    CategoryListComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    AddSearchCategoryComponent,
    SearchCategoryListComponent,
    UserDefinedCategoryListComponent,
    CategoryManagementComponent,
    UserDefinedCategoryManagementComponent,
    UserDefinedCategoryAddComponent,
    UserDefinedCategoryEditComponent,
    ServiceListComponent,
    AddServiceModalComponent,
    ServiceListItemComponent,
    EditServiceModalComponent,
    DiscoverComponent,
    BusinessesOverviewComponent,
    BusinessProfileImageManagementComponent,
    BusinessProfileSummaryComponent,
    BusinessesFilterModalComponent,
    BusinessFilterComponent,
    BusinessMainPageComponent,
    ProfileComponent,
    BusinessesWaitingForApprovalComponent,
    BusinessesManagementComponent,
    BusinessesListComponent,
    ConfirmationModalComponent,
    BusinessRegistrationComponent,
    EmployeeManagementComponent,
    EmployeeDetailsComponent,
    EmployeeWorkingHoursComponent,
    ServiceEmployeePairComponent,
    BookingManagementComponent,
    AvailableSlotsComponent,
    BookingConfirmationComponent,
    AppointmentCalendarComponent,
    CalendarHeaderComponent,
    AppointmentManagementComponent,
    CustomerManagementComponent,
    CustomerPageComponent,
    CustomerDetailsComponent,
    CreateAppointmentModalComponent,
    SearchCustomersComponent,
    CreateAppointmentFormComponent,
    AppointmentInfoModalComponent,
    AppointmentDetailsComponent,
    AppointmentComponent,
    AppointmentStatusChangeComponent,
    LeaveReviewModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgxPaginationModule,
    NgOptimizedImage,
    MatCheckboxModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatExpansionModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],

  providers: [AuthService, {provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true,},
    {provide: LOCALE_ID, useValue: 'sr-Latn'}],
  exports: [
    BusinessesWaitingForApprovalComponent,
    BookingDatePickerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

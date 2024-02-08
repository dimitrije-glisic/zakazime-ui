import {Injectable, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HowItWorksComponent} from './public-layout/how-it-works/how-it-works.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegistrationComponent} from './registration-login/registration/registration.component';
import {LoginComponent} from './registration-login/login/login.component';
import {PublicHeaderComponent} from './public-layout/public-header/public-header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {FinishRegistrationComponent} from './registration-login/finish-registration/finish-registration.component';
import {AuthService} from "./auth.service";
import {BusinessDashboardComponent} from './business/components/business-dashboard/business-dashboard.component';
import {BusinessServicesComponent} from './business/components/services/business-services/business-services.component';
import {StatisticsComponent} from './business/components/statistics/statistics.component';
import {ServicesFilterPipe} from './business/components/services/services-filter.pipe';
import {BusinessProfileComponent} from './business/components/business-profile/business-profile.component';
import {AddServiceFormComponent} from './business/components/services/add-service-form/add-service-form.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {BusinessTypesComponent} from './public-layout/business-types/business-types-component-public.component';
import {CategoriesComponent} from './public-layout/categories/categories.component';
import {BusinessListingComponent} from './public-layout/business-listing/business-listing.component';
import {BreadcrumbComponent} from './public-layout/breadcrumb/breadcrumb.component';
import {BusinessDetailsComponent} from './public-layout/business-details/business-details.component';
import {NavbarComponent} from './public-layout/navbar/navbar.component';
import {
  BookingSelectServicesComponent
} from './public-layout/booking/booking-select-services/booking-select-services.component';
import {FilterByCategoryPipe} from './public-layout/filter-by-subcategory.pipe';
import {BookingDatePickerComponent} from './public-layout/booking/booking-date-picker/booking-date-picker.component';
import {ConfirmBookingComponent} from './public-layout/booking/confirm-booking/confirm-booking.component';
import {BookingSummaryComponent} from './public-layout/booking/booking-summary/booking-summary.component';
import {BookingBreadcrumbComponent} from './public-layout/booking/booking-breadcrumb/booking-breadcrumb.component';
import {DashboardComponent} from './admin/components/dashboard/dashboard.component';
import {BusinessTypeListComponent} from './admin/components/business-types/business-type-list/business-type-list.component';
import {NgOptimizedImage} from "@angular/common";
import { BusinessTypeAddComponent } from './admin/components/business-types/business-type-add/business-type-add.component';
import { BusinessTypeEditComponent } from './admin/components/business-types/business-type-edit/business-type-edit.component';
import { BusinessTypeManagement } from './admin/components/business-types/business-type-management/business-type-management.component';
import { CategoryManagementComponent } from './admin/components/categories/category-management/category-management.component';
import { CategoryListComponent } from './admin/components/categories/category-list/category-list.component';
import { CategoryAddComponent } from './admin/components/categories/category-add/category-add.component';
import { CategoryEditComponent } from './admin/components/categories/category-edit/category-edit.component';
import { AddSearchCategoryComponent } from './business/components/add-search-category/add-search-category.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { SearchCategoryListComponent } from './business/components/search-category-list/search-category-list.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import { UserDefinedCategoryListComponent } from './business/components/categories/user-defined-category-list/user-defined-category-list.component';
import {
  UserDefinedCategoryManagementComponent
} from "./business/components/categories/user-defined-category-management/user-defined-category-management.component";
import { UserDefinedCategoryAddComponent } from './business/components/categories/user-defined-category-add/user-defined-category-add.component';
import { UserDefinedCategoryEditComponent } from './business/components/categories/user-defined-category-edit/user-defined-category-edit.component';
import { ServiceListComponent } from './business/components/categories/service-list/service-list.component';
import { AddServiceModalComponent } from './business/components/categories/add-service-modal/add-service-modal.component';
import {MatButtonModule} from "@angular/material/button";
import {FlexModule} from "@angular/flex-layout";

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
    HowItWorksComponent,
    RegistrationComponent,
    LoginComponent,
    PublicHeaderComponent,
    FinishRegistrationComponent,
    BusinessDashboardComponent,
    BusinessServicesComponent,
    AddServiceFormComponent,
    StatisticsComponent,
    ServicesFilterPipe,
    BusinessProfileComponent,
    BusinessTypesComponent,
    CategoriesComponent,
    BusinessListingComponent,
    BreadcrumbComponent,
    BusinessDetailsComponent,
    NavbarComponent,
    BookingSelectServicesComponent,
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
    FlexModule,
  ],
  providers: [AuthService, {provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true,}],
  bootstrap: [AppComponent]
})
export class AppModule {
}

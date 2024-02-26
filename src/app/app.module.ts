import {Injectable, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegistrationComponent} from './registration-login/registration/registration.component';
import {LoginComponent} from './registration-login/login/login.component';
import {PublicHeaderComponent} from './public-layout/legacy/public-header/public-header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {FinishRegistrationComponent} from './registration-login/finish-registration/finish-registration.component';
import {AuthService} from "./auth.service";
import {BusinessDashboardComponent} from './business/components/business-dashboard/business-dashboard.component';
import {ServiceManagementComponent} from './business/components/service-management/service-management.component';
import {StatisticsComponent} from './business/components/statistics/statistics.component';
import {ServicesFilterPipe} from './business/components/services/services-filter.pipe';
import {BusinessProfileComponent} from './business/components/business-profile/business-profile.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NavbarComponent} from './public-layout/legacy/navbar/navbar.component';
import {
  BookingSelectServicesComponent
} from './public-layout/booking/booking-select-services/booking-select-services.component';
import {FilterByCategoryPipe} from './public-layout/legacy/filter-by-subcategory.pipe';
import {BookingDatePickerComponent} from './public-layout/booking/booking-date-picker/booking-date-picker.component';
import {ConfirmBookingComponent} from './public-layout/booking/confirm-booking/confirm-booking.component';
import {BookingSummaryComponent} from './public-layout/booking/booking-summary/booking-summary.component';
import {BookingBreadcrumbComponent} from './public-layout/booking/booking-breadcrumb/booking-breadcrumb.component';
import {DashboardComponent} from './admin/components/dashboard/dashboard.component';
import {
  BusinessTypeListComponent
} from './admin/components/business-types/business-type-list/business-type-list.component';
import {NgOptimizedImage} from "@angular/common";
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
    PublicHeaderComponent,
    FinishRegistrationComponent,
    BusinessDashboardComponent,
    ServiceManagementComponent,
    StatisticsComponent,
    ServicesFilterPipe,
    BusinessProfileComponent,
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
    ReactiveFormsModule
  ],
  providers: [AuthService, {provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true,}],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HowItWorksComponent } from './public-layout/how-it-works/how-it-works.component';
import { AppRoutingModule } from './app-routing.module';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration-login/registration/registration.component';
import { LoginComponent } from './registration-login/login/login.component';
import { PublicLayoutComponent } from './public-layout/public-layout/public-layout.component';
import { PublicHeaderComponent } from './public-layout/public-header/public-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FinishRegistrationComponent } from './registration-login/finish-registration/finish-registration.component';
import { AuthService } from "./auth.service";
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { BusinessDashboardComponent } from './business/components/business-dashboard/business-dashboard.component';
import { BusinessServicesComponent } from './business/components/services/business-services/business-services.component';
import { StatisticsComponent } from './business/components/statistics/statistics.component';
import { AddServiceFastFormComponent } from './business/components/services/add-service-fast-form/add-service-fast-form.component';
import { ServicesFilterPipe } from './business/components/services/filter-name.pipe';
import { EditServiceComponent } from './business/components/services/edit-service/edit-service.component';
import { BusinessProfileComponent } from './business/components/business-profile/business-profile.component';
import { AddServiceFormComponent } from './business/components/services/add-service-form/add-service-form.component';
import { NgxPaginationModule } from 'ngx-pagination';

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
    PublicLayoutComponent,
    PublicHeaderComponent,
    FinishRegistrationComponent,
    HomeComponent,
    AdminComponent,
    BusinessDashboardComponent,
    BusinessServicesComponent,
    AddServiceFormComponent,
    StatisticsComponent,
    AddServiceFastFormComponent,
    EditServiceComponent,
    ServicesFilterPipe,
    BusinessProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgxPaginationModule
  ],
  providers: [AuthService, { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }],
  // { provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {
}

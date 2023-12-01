import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HowItWorksComponent } from './public-layout/how-it-works/how-it-works.component';
import { LoginComponent } from './registration-login/login/login.component';
import { PublicLayoutComponent } from './public-layout/public-layout/public-layout.component';
import { HomeComponent } from "./home/home.component";
import { AdminComponent } from './admin/admin.component';
import { RoleGuard } from './role.guard';
import { BusinessDashboardComponent } from './business/components/business-dashboard/business-dashboard.component';
import { StatisticsComponent } from './business/components/statistics/statistics.component';
import { BusinessServicesComponent } from './business/components/services/business-services/business-services.component';
import { AddServiceFormComponent } from './business/components/services/add-service-form/add-service-form.component';
import { AddServiceFastFormComponent } from './business/components/services/add-service-fast-form/add-service-fast-form.component';
import { EditServiceComponent } from './business/components/services/edit-service/edit-service.component';
import { BusinessProfileComponent } from './business/components/business-profile/business-profile.component';
import { FinishRegistrationComponent } from './registration-login/finish-registration/finish-registration.component';
import { FinishedRegistrationGuard } from './finished.registration.guard';
import { BusinessTypeHomeComponent } from './public-layout/business-type-home/business-type-home.component';
import { BusinessTypesComponent } from './public-layout/business-types/business-types.component';
import { CategoriesComponent } from './public-layout/categories/categories.component';
import { SubCategoriesComponent } from './public-layout/sub-categories/sub-categories.component';
import { BusinessListingComponent } from './public-layout/business-listing/business-listing.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: BusinessTypesComponent },
      // ... other static routes

      {
        path: ':title', 
        component: CategoriesComponent, 
        data: { breadcrumb: '/:title' } // Including 'Home' for full path
      },
      {
        path: ':title/:categoryTitle', 
        component: SubCategoriesComponent, 
        data: { breadcrumb: '/:title/:categoryTitle' }
      },
      {
        path: ':title/:categoryTitle/:subCategoryTitle', 
        component: BusinessListingComponent, 
        data: { breadcrumb: '/:title/:categoryTitle/:subCategoryTitle' }
      },
    ]
  },

  { path: 'manage-users', component: AdminComponent, canActivate: [RoleGuard], data: { expectedRole: 'ADMIN' } },
  // { path: 'manage-business', component: BusinessComponent, canActivate: [RoleGuard], data: { expectedRole: 'SERVICE_PROVIDER' } },

  {
    path: 'manage-business', component: BusinessDashboardComponent, canActivate: [FinishedRegistrationGuard],
    children: [
      { path: 'profile', component: BusinessProfileComponent },

      { path: '', component: StatisticsComponent },
      { path: 'services', component: BusinessServicesComponent },
      { path: 'services/create', component: AddServiceFormComponent },
      { path: 'services/create-fast', component: AddServiceFastFormComponent },
      { path: 'services/edit/:id', component: EditServiceComponent },
    ]
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentComponent } from './resources/document.component';
import { ForumsComponent } from './interactionForums/forums.component';

import { PeopleComponent } from './employees/people.component';
import { IntranetComponent } from './intranet/intranet.component';
import { AppsComponent } from './apps/apps.component';

import { DashboardNewJoineesComponent } from './dashboard-new-joinees/dashboard-new-joinees.component';
import { DashboardRecentlyPostedComponent } from './dashboard-recently-posted/dashboard-recently-posted.component';
import { DashboardIndustryNewsComponent } from './dashboard-industry-news/dashboard-industry-news.component';

import { EmployeesComponent } from './employees/employees/employees.component';
import { SiloviewComponent } from './employees/siloview/siloview.component';
import { SubCategoryForumsComponent } from './interactionForums/sub-category-forums/sub-category-forums.component';
import { IndividualPostComponent } from './interactionForums/individual-post/individual-post.component';
import { InteractionForumsComponent } from './interactionForums/interaction-forums/interaction-forums.component';
import { PolicesFormsComponent } from './resources/polices-forms/polices-forms.component';
import { AuthGuardService } from './authGuard.service';
import { DashboardCeodeskComponent } from './dashboard-ceodesk/dashboard-ceodesk.component';

const routes: Routes = [
  {
    path: 'intranet', component: IntranetComponent, children: [
      { path: '', redirectTo: 'newsupdates', pathMatch: 'full' },
      {
        path: 'newsupdates', component: DashboardComponent, children: [
          { path: '', redirectTo: 'all', pathMatch: 'full', canActivate: [AuthGuardService] },
          { path: 'all', component: DashboardRecentlyPostedComponent, canActivate: [AuthGuardService] },
          { path: 'events', component: DashboardRecentlyPostedComponent, canActivate: [AuthGuardService] },
          { path: 'awards', component: DashboardRecentlyPostedComponent, canActivate: [AuthGuardService] },
          { path: 'managementcommunications', component: DashboardRecentlyPostedComponent, canActivate: [AuthGuardService] },
          { path: 'newjoinees', component: DashboardNewJoineesComponent, canActivate: [AuthGuardService] },
          { path: 'ceodesk', component: DashboardCeodeskComponent, canActivate: [AuthGuardService]},
          { path: 'industrynews', component: DashboardIndustryNewsComponent, canActivate: [AuthGuardService] }
        ], canActivate: [AuthGuardService]
      },
      {
        path: 'documents', component: DocumentComponent, children: [
          { path: '', redirectTo: 'policies', pathMatch: 'full' },
          { path: 'policies', component: PolicesFormsComponent, canActivate: [AuthGuardService] },
          { path: 'forms', component: PolicesFormsComponent, canActivate: [AuthGuardService] },
          { path: 'l&d', component: PolicesFormsComponent, canActivate: [AuthGuardService] }
        ], canActivate: [AuthGuardService]
      },
      {
        path: 'forums', component: ForumsComponent, children: [
          { path: '', redirectTo: 'newlyadded', pathMatch: 'full' },
          {
            path: 'trending', component: InteractionForumsComponent, children: [
              { path: '', redirectTo: 'trendingallevents', pathMatch: 'full' },
              { path: 'trendingallevents', component: SubCategoryForumsComponent, canActivate: [AuthGuardService] },
              { path: 'individual-post', component: IndividualPostComponent, canActivate: [AuthGuardService] }
            ], canActivate: [AuthGuardService]
          },
          {
            path: 'newlyadded', component: InteractionForumsComponent, children: [
              { path: '', redirectTo: 'newlyaddedallevents', pathMatch: 'full' },
              { path: 'newlyaddedallevents', component: SubCategoryForumsComponent, canActivate: [AuthGuardService] },
              { path: 'individual-post', component: IndividualPostComponent, canActivate: [AuthGuardService] }
            ], canActivate: [AuthGuardService]
          },
          {
            path: 'mostcommented', component: InteractionForumsComponent, children: [
              { path: '', redirectTo: 'mostcommentedallevents', pathMatch: 'full' },
              { path: 'mostcommentedallevents', component: SubCategoryForumsComponent, canActivate: [AuthGuardService] },
              { path: 'individual-post', component: IndividualPostComponent, canActivate: [AuthGuardService] }
            ], canActivate: [AuthGuardService]
          },
          {
            path: 'classified', component: InteractionForumsComponent, children: [
              { path: '', redirectTo: 'classifiedallevents', pathMatch: 'full' },
              { path: 'classifiedallevents', component: SubCategoryForumsComponent, canActivate: [AuthGuardService] },
              { path: 'individual-post', component: IndividualPostComponent, canActivate: [AuthGuardService] }
            ], canActivate: [AuthGuardService]
          },
          {
            path: 'lost&found', component: InteractionForumsComponent, children: [
              { path: '', redirectTo: 'lost&foundallevents', pathMatch: 'full' },
              { path: 'lost&foundallevents', component: SubCategoryForumsComponent, canActivate: [AuthGuardService] },
              { path: 'individual-post', component: IndividualPostComponent, canActivate: [AuthGuardService] }
            ], canActivate: [AuthGuardService]
          },
          {
            path: 'polling', component: InteractionForumsComponent, children: [
              { path: '', redirectTo: 'pollingallevents', pathMatch: 'full' },
              { path: 'pollingallevents', component: SubCategoryForumsComponent, canActivate: [AuthGuardService] },
              { path: 'individual-post', component: IndividualPostComponent, canActivate: [AuthGuardService] }
            ], canActivate: [AuthGuardService]
          }


        ]
      },

      {
        path: 'people', component: PeopleComponent, children: [
          { path: '', redirectTo: 'employee', pathMatch: 'full' },
          { path: 'employee', component: EmployeesComponent, canActivate: [AuthGuardService] },
          //       { path: 'employee-page', component: EmployeePageComponent },
          { path: 'siloview', component: SiloviewComponent, canActivate: [AuthGuardService] }
        ], canActivate: [AuthGuardService]
      },
      { path: 'apps', component: AppsComponent, canActivate: [AuthGuardService] },
      { path: '*', redirectTo: 'intranet' }
    ]
  },
  { path: '**', redirectTo: 'intranet' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

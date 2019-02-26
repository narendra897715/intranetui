import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Angular2FontawesomeModule } from 'angular2-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app.material';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true
};
import { AppComponent } from './app.component';



import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { MdePopoverModule } from '@material-extended/mde';


import { DashboardComponent } from './dashboard/dashboard.component';
import { PeopleComponent } from './employees/people.component';
import { DocumentComponent } from './resources/document.component';
import { ForumsComponent } from './interactionForums/forums.component';
import { AppsComponent } from './apps/apps.component';
import { IntranetComponent } from './intranet/intranet.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { PopupModalComponent } from './popup-modal/popup-modal.component';
import { BusinessLogicService} from './business-logic.service';
import { DashboardNewJoineesComponent } from './dashboard-new-joinees/dashboard-new-joinees.component';
import { DashboardRecentlyPostedComponent } from './dashboard-recently-posted/dashboard-recently-posted.component';
import { DashboardIndustryNewsComponent } from './dashboard-industry-news/dashboard-industry-news.component';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { WishesSentComponent } from './dashboard/wishes-sent/wishes-sent.component';
import { EditpopupmodalComponent } from './editpopupmodal/editpopupmodal.component';
import { EmployeesComponent } from './employees/employees/employees.component';
import { SiloviewComponent } from './employees/siloview/siloview.component';
import { ImagezoompopupComponent } from './imagezoompopup/imagezoompopup.component';
import { ImageViewerModule } from 'ngx-image-viewer';
import { AppreciationPopupComponent } from './employees/appreciation-popup/appreciation-popup.component';
import { SafeUrlPipe } from './Pipes/safeurl.pipe';
import { SafeHtmlPipe } from './Pipes/pipe.safehtml';
import { AutofocusDirective } from './Pipes/autofocus';
import { SubCategoryForumsComponent } from './interactionForums/sub-category-forums/sub-category-forums.component';
import { IndividualPostComponent } from './interactionForums/individual-post/individual-post.component';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

import { InteractionForumsComponent } from './interactionForums/interaction-forums/interaction-forums.component';
import { UploadPopupComponent } from './resources/polices-forms/upload-popup/upload-popup.component';
import { PolicesFormsComponent } from './resources/polices-forms/polices-forms.component';

import { AddHeaderInterceptor } from './intercept.service';
import { AuthGuardService } from './authGuard.service';
import { InteractionForumsDailogComponent } from './interactionForums/interaction-forums-dailog/interaction-forums-dailog.component';
import { EditDailogForPollingeventComponent} from './interactionForums/edit-dailog-for-pollingevent/edit-dailog-for-pollingevent.component';
import { ConfirmDailogComponent } from './confirm-dailog/confirm-dailog.component';
import { DashboardCeodeskComponent } from './dashboard-ceodesk/dashboard-ceodesk.component';
// import { AngularEditorModule } from '@kolkov/angular-editor';
import {ImageUploadService} from './imageUpload.service';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
 import {DpDatePickerModule} from 'ng2-date-picker';
 import {notificationDialog} from './business-logic.service';
//  import { Angular5TimePickerModule } from 'angular5-time-picker';
// import { TimepickerDirective } from 'angular5-time-picker';
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
// import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
// import {CalendarModuleSE} from 'primeng/calendar';
// import {TimePickerComponent} from "angular2-timepicker/timepicker-component";
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    BrowserModule.withServerTransition({ appId: 'intranet-app' }),
    CalendarModule.forRoot(),
    Angular2FontawesomeModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    ImageViewerModule,
    RoundProgressModule,
    MdePopoverModule,
    DpDatePickerModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    //  CalendarModuleSE
    // AngularDateTimePickerModule,
    // OwlDateTimeModule,
    //      OwlNativeDateTimeModule,
    // Angular5TimePickerModule
  ],
  exports: [
    CdkTableModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    PeopleComponent,
    DocumentComponent,
    ForumsComponent,
    AppsComponent,
    IntranetComponent,
    PopupModalComponent,
    DashboardNewJoineesComponent,
    DashboardRecentlyPostedComponent,
    DashboardIndustryNewsComponent,
    CalendarHeaderComponent,
    WishesSentComponent,
    EditpopupmodalComponent,
    ImagezoompopupComponent,
    EmployeesComponent,
    AppreciationPopupComponent,
    SafeUrlPipe,
    SafeHtmlPipe,
    AutofocusDirective,
    SiloviewComponent,
    SubCategoryForumsComponent,
    IndividualPostComponent,
    InteractionForumsComponent,
    UploadPopupComponent,
    PolicesFormsComponent,
    InteractionForumsDailogComponent,
    EditDailogForPollingeventComponent,
    ConfirmDailogComponent,
    DashboardCeodeskComponent,
    notificationDialog
    // TimepickerDirective
  ],
  providers: [BusinessLogicService, AuthGuardService, ImageUploadService, AddHeaderInterceptor, {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [PopupModalComponent, WishesSentComponent,
    EditpopupmodalComponent, ImagezoompopupComponent, AppreciationPopupComponent, InteractionForumsDailogComponent,
     UploadPopupComponent, ConfirmDailogComponent, EditDailogForPollingeventComponent,notificationDialog
  ],
})
export class AppModule { }

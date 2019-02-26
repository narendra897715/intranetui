import { Component, OnInit, ViewEncapsulation, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BusinessLogicService } from '../business-logic.service';
import { MatDialog } from '@angular/material';
import { CalendarEvent, CalendarDateFormatter, CalendarEventTitleFormatter } from 'angular-calendar';
import { EventEmitter, TemplateRef } from '@angular/core';
import { subDays, startOfDay, addDays, endOfMonth, addHours, endOfDay } from 'date-fns';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { CustomEventTitleFormatter } from './custom-event-title-formatter.provider';
import { MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:use-host-property-decorator
  host: { 'class': 'section main hbox space-between' },
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    },
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter
    }
  ]
})

export class DashboardComponent implements OnInit {
  sidenavwidth = '0px';
  public activeUrl: string;
  catergoryname: string;
  wishesSent = false;
  category_url: string;
  upcomingHighlights: any = [];
  updates: any;
  timeFilterList: any;
  time_Filter: any;
  filterId = 0;
  todayHighlights: any = [];
  previousHighlights: any = [];
  makeupcomingtab = false;
  maketodaytab = true;
  makepasttab = false;
  sidePaneHide = false;
  constructor(private businesslogic: BusinessLogicService, public snackBar: MatSnackBar, private sanitizer: DomSanitizer,
    private route: ActivatedRoute, private http: HttpClient, private router: Router, public dialog: MatDialog) {
      this.businesslogic.getMessage().subscribe(message => {
        this.getSubMenu();
      });
     }
  submenu: Itab[];
  public viewDate: Date = new Date();
  public events: CalendarEvent[] = [];

  @Input() view: string;
  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();
  @Input() tooltipTemplate: TemplateRef<any>;
  @Input('tooltipEvent') event: CalendarEvent;  // tslint:disable-line no-input-rename
  dateChange(ev) { this.viewDate = ev; console.log('date change', this.viewDate); this.calendar(); }
  // day(event: CalendarEvent, title: string);

  ngOnInit() {
    if (this.businesslogic.employeeId === null) {
      this.businesslogic.get('employee/getEmployeeDetailsWithToken').subscribe((response: any) => {
        this.getSubMenu();
        // this.redirect('recentlyposted', 'Recently Posted');
        this.eventsInfo();
        this.calendar();
      });
    } else {
      this.getSubMenu();
      // this.redirect('recentlyposted', 'Recently Posted');
      this.eventsInfo();
      this.calendar();
    }
   

  }

  getSubMenu() {
    this.businesslogic.get('news&updates/getSubMenu').subscribe((response: any) => {
      this.submenu = response;
      this.category_url = this.submenu[0]['categoryName'];
    });
  }


  redirect(url, categoryname) {
    this.sidenavwidth = '0px';
    // this.activeUrl = url;
    this.catergoryname = categoryname;
    this.router.navigate([url], { relativeTo: this.route });
  }
  eventsInfo() {
    this.businesslogic.get('news&updates/eventsInfo').subscribe((response: any) => {
      this.upcomingHighlights = response.upcomingHighlights;
      this.todayHighlights = response.todayHighlights;
      this.previousHighlights = response.previousHighlights;
    });
  }
  upcomingHighlightstab() {
    this.makeupcomingtab = true;
    this.maketodaytab = false;
    this.makepasttab = false;
  }
  todayHighlightstab() {
    this.maketodaytab = true;
    this.makeupcomingtab = false;
    this.makepasttab = false;
  }
  pastHighlightstab() {
    this.makepasttab = true;
    this.maketodaytab = false;
    this.makeupcomingtab = false;
  }
  send_wishes(element) {
    // tslint:disable-next-line:max-line-length
    element.firstName = this.businesslogic.firstname;
    this.businesslogic.post('news&updates/sendWishes', element).subscribe((response: any) => {
      // const dialogRef = this.dialog.open(WishesSentComponent, { width: '15%' });
      this.snackBar.open('Wishes sent successfully', '', { duration: 3000, panelClass: ['successMessage'] });
    });
  }

  calendar() {
    console.log('called');
    if (this.sidePaneHide === false) {
      this.viewDate = new Date();
    }
    this.businesslogic.post('news&updates/calendarDetails', { 'date': this.viewDate ? this.viewDate : null }).subscribe((response: any) => {
      this.events = response;
      console.log(this.events[0].title);
    });
  }
  opensidnav() {
    this.sidenavwidth = '250px';
  }
  closeNav() {
    this.sidenavwidth = '0px';
  }

  mouseHover(event) {
    if (event) {
      console.log(event);
    } else if (!event) {
      console.log('no event');
    }
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  gotoEmployeePage(empID) {
    this.router.navigate(['intranet/people/employee', { 'value': true, 'id': empID }]);
  }

}


interface Ilist {
  name: string;
  date: string;
  heading: string;
  subtext: string;
}
interface Itab {
  categoryName: string;
  categoryId: string;
  typeId: string;
  catergoryURL: string;
  // tslint:disable-next-line:eofline
}
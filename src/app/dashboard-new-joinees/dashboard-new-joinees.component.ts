import { Component, OnInit , ViewChild} from '@angular/core';
import { BusinessLogicService } from '../business-logic.service';
import { IJoiness } from '../app.interface';
import { NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {PerfectScrollbarComponent} from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-dashboard-new-joinees',
  templateUrl: './dashboard-new-joinees.component.html',
  styleUrls: ['./dashboard-new-joinees.component.scss'],
  /* tslint:disable:use-host-property-decorator */
  host: { 'class': 'section main hbox space-between' }
})
export class DashboardNewJoineesComponent implements OnInit {

  // @ViewChild(PerfectScrollbarComponent) njcomponentRef?: PerfectScrollbarComponent;

  rowcount = 0;
  showgotoupbuttonInNJ = false;
  joinees: IJoiness = {
    search: null,
    filterId: 4,
    pageNo: 1,
    pageSize: 10,

  };
  newjoinee = [];
  timeFilterList: any;
  noDataAvailableInNewJoinee: boolean;
  constructor(private businesslogic: BusinessLogicService, public nz: NgZone,
    public router: Router, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.NewJoineeDetails();
    this.timeFilter();
  }

  searchNewJoinees() {
    this.joinees.pageNo = 1;
    this.newjoinee = [];
    this.NewJoineeDetails();
  }

  // gotoupbutton123() {
  //   this.njcomponentRef.directiveRef.scrollToTop();
  //   this.showgotoupbuttonInNJ = false;
  // }

  // showgotoup(event) {
  //   if (event.target.scrollTop > 100) {
  //     this.nz.run(() => {
  //       this.showgotoupbuttonInNJ = true;
  //     });
  //   } else {
  //     this.nz.run(() => {
  //       this.showgotoupbuttonInNJ = false;
  //     });

  //   }
  // }

  onScrollEvent(event) {
    if (event.target.scrollTop !== 0 && this.newjoinee.length < this.rowcount) {
      this.NewJoineeDetails();
    }
  }

  timeFilter() {
    // console.log('filterid', this.time_Filter);
    this.businesslogic.get('news&updates/newsAndUpdatesFilter').subscribe((response: any) => {
      this.timeFilterList = response;
    });
  }

  NewJoineeDetails() {
    this.businesslogic.postUpdate('news&updates/newJoineeDetails', this.joinees).subscribe((response: any) => {
    
      if (response.result.length !== 0) {
        this.noDataAvailableInNewJoinee = false;
        this.joinees.pageNo = this.joinees.pageNo + 1;
        this.rowcount = response.rowCount;

        this.nz.run(() => {
          if (this.newjoinee.length < this.rowcount) {
            this.newjoinee = this.newjoinee.concat(response.result);
          } else {
            this.newjoinee = response.result;

          }

        });
      } else {
        this.noDataAvailableInNewJoinee = true;
        this.newjoinee = response.result;
      }
    });
  }

  gotoEmployeePage(empID) {
    this.router.navigate(['intranet/people/employee', { 'value': true, 'id': empID }]);
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}

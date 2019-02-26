import { Component, OnInit } from '@angular/core';
import { BusinessLogicService } from '../business-logic.service';
import { IJoiness } from '../app.interface';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-dashboard-industry-news',
  templateUrl: './dashboard-industry-news.component.html',
  styleUrls: ['./dashboard-industry-news.component.scss'],
  /* tslint:disable:use-host-property-decorator */
  host: { 'class': 'section main hbox space-between' }
})
export class DashboardIndustryNewsComponent implements OnInit {

  industryNews = [];
  newsLoading: boolean;
  totalObjectdata: any;
  makeTotalDisplaynewsScreenVisible = false;
  filterObject: any;

  rowcount = 0;
  news: IJoiness = {
    search: null,
    filterId: 4,
    pageNo: 1,
    pageSize: 10,

  };
  timeFilterList: any;

  constructor(private businesslogic: BusinessLogicService, public nz: NgZone) { }

  ngOnInit() {
    this.timeFilter();
  //  this.IndustryUpdates();
  }

  searchnews() {
    this.news.pageNo = 1;
    this.industryNews = [];
    this.IndustryUpdates();
  }

  timeFilter() {
    // console.log('filterid', this.time_Filter);
    this.businesslogic.get('news&updates/industryNewsFilter').subscribe((response: any) => {
      this.timeFilterList = response;
      this.filterObject = response[0];
      this.IndustryUpdates();
    });
  }

  IndustryUpdates() {
    console.log(this.filterObject);
    this.newsLoading = true;
    this.businesslogic.post('news&updates/industryNews', this.filterObject).subscribe((response: any) => {
      this.newsLoading = response.articles ? false : true;
      this.news.pageNo = response.pages;
      this.rowcount = response.rowCount;
      // console.log(response);
      this.nz.run(() => {
        if (this.news.search == null || this.news.search === '') {
          this.industryNews = this.industryNews.concat(response);
        } else {
          this.industryNews = response;
        }
      });
    });
  }

  /*Display individualevent complete data*/
  displayCompleteData(eventdata) {
    console.log('eventid', eventdata);
    this.makeTotalDisplaynewsScreenVisible = true;
    this.totalObjectdata = eventdata;
  }

  /*Event Fire when scroll reached bottom*/
  onScrollEvent(event) {
    if (event.target.scrollTop !== 0 && this.industryNews.length < this.rowcount) {
      this.IndustryUpdates();
    }
  }

  gobacktopost() {
    this.makeTotalDisplaynewsScreenVisible = false;
    this.news.pageNo = 1;
    this.industryNews = [];
    this.IndustryUpdates();
  }

}

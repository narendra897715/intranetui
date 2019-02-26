import { Component, OnInit, NgZone, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessLogicService } from '../../business-logic.service';
// import { MatDialog } from '@angular/material';
import { EditpopupmodalComponent } from '../../editpopupmodal/editpopupmodal.component';
import { INewimageuploadforexistingarray, IinteractiveforumsCategories, Ipollingoptions } from '../../app.interface';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { InteractionForumsDailogComponent } from '../interaction-forums-dailog/interaction-forums-dailog.component';
@Component({
  selector: 'app-sub-category-forums',
  templateUrl: './sub-category-forums.component.html',
  styleUrls: ['./sub-category-forums.component.scss'],
  /* tslint:disable:use-host-property-decorator */
  host: { 'class': 'section main hbox space-between' }
})
export class SubCategoryForumsComponent implements OnInit, OnDestroy, AfterViewInit {
  makeInteractionScreenVisible = false;
  interactiveForumsdata: IinteractiveforumsCategories = {
    search: null,
    categoryId: null,
    pageNo: 1,
    pageSize: 10,
    filterId: 4,
    employeeId: this.businesslogic.employeeId
  };
  rowcount = 0;
  show = '';
  interactiveforumdata = [];
  timeFilterList: any;
  categoryFilterList: any;
  eventServiceUrl: any;
  subscription: Subscription;
  post_object: any;
  clearSearch = false;
  dummyobject: any;
  showEventsFilter = true;
  showTimeFilter = true;
  categorySelectedName: any;
  suggestedoption =  '';
  disableSuggestButton = true;
  newValue = {
    'categoryId': null,
    'categoryName': 'All'
  };
  noDataAvailableInIF: boolean;
  todayDate = new Date().getTime();
  // milliseconddata = Date.parse(this.todayDate);
  constructor(private route: ActivatedRoute, private businesslogic: BusinessLogicService, private router: Router,
    public dialog: MatDialog, public nz: NgZone, private sanitizer: DomSanitizer, public snackBar: MatSnackBar) {
  }


  onScrollEvent(event) {
    if (event.target.scrollTop !== 0 && this.interactiveforumdata.length < this.rowcount) {
      this.interactionForums();
    }

  }

  ngOnInit() {
    this.categorySelectedName = this.route.snapshot.url[0].path;
    switch (this.route.snapshot.url[0].path) {
      case 'trendingallevents':
      this.showEventsFilter = true;
      this.showTimeFilter = false;
        this.eventServiceUrl = 'interaction_forums/getInteractionForumsTrendingDetails';
        break;
      case 'newlyaddedallevents':
      this.showEventsFilter = true;
      this.showTimeFilter = true;
        this.eventServiceUrl = 'interaction_forums/getInteractionForumsNewlyAddedDetails';
        break;
      case 'mostcommentedallevents':
      this.showEventsFilter = true;
      this.showTimeFilter = false;
        this.eventServiceUrl = 'interaction_forums/getInteractionForumsMostCommentedDetails';
        break;
        case 'classifiedallevents':
        this.showEventsFilter = false;
        this.showTimeFilter = true;
        this.eventServiceUrl = 'interaction_forums/getInteractionForumsNewlyAddedDetails';
        this.interactiveForumsdata = {
          search: null,
          categoryId: 6,
          pageNo: 1,
          pageSize: 10,
          filterId: 4,
          employeeId: this.businesslogic.employeeId
        };
        break;
        case 'lost&foundallevents':
        this.showEventsFilter = false;
        this.showTimeFilter = true;
        this.eventServiceUrl = 'interaction_forums/getInteractionForumsNewlyAddedDetails';
        this.interactiveForumsdata = {
          search: null,
          categoryId: 8,
          pageNo: 1,
          pageSize: 10,
          filterId: 4,
          employeeId: this.businesslogic.employeeId
        };
        break;
        case 'pollingallevents':
        this.showEventsFilter = false;
        this.showTimeFilter = true;
        this.eventServiceUrl = 'interaction_forums/getInteractionForumsNewlyAddedDetails';
        this.interactiveForumsdata = {
          search: null,
          categoryId: 7,
          pageNo: 1,
          pageSize: 10,
          filterId: 4,
          employeeId: this.businesslogic.employeeId
        };
        break;

      default:
        this.eventServiceUrl = 'interaction_forums/getInteractionForumsTrendingDetails';
    }
    if (this.businesslogic.employeeId == null) {
      // tslint:disable-next-line:max-line-length
      this.businesslogic.get('employee/getEmployeeDetailsWithToken').subscribe((response: any) => {
        this.businesslogic.employeeId = response[0].employeeID;
        this.interactiveforumdata = [];
        this.categoryFilter();
    this.timeFilter();
        this.interactionForums();
      });
    } else {
      this.interactiveforumdata = [];
      this.categoryFilter();
    this.timeFilter();
      this.interactionForums();
    }



  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks

  }
  timeFilter() {
    this.businesslogic.get('news&updates/newsAndUpdatesFilter').subscribe((response: any) => {
      this.timeFilterList = response;
    });
  }
  /*Display Recently posted events*/
  interactionForums() {
    this.interactiveForumsdata.employeeId = this.businesslogic.employeeId;
    this.businesslogic.postUpdate(this.eventServiceUrl, this.interactiveForumsdata).subscribe((response: any) => {
      if (response.result.length !== 0) {
        this.noDataAvailableInIF = false;
        this.interactiveForumsdata.pageNo = this.interactiveForumsdata.pageNo + 1;
        this.rowcount = response.rowCount;
        this.nz.run(() => {
          if (this.interactiveforumdata.length < this.rowcount) {
            this.interactiveforumdata = this.interactiveforumdata.concat(response.result);
          } else {
            this.interactiveforumdata = response.result;
          }
        });
      } else {
        this.noDataAvailableInIF = true;
        this.interactiveforumdata = response.result;
      }
    });
  }
  /*Display Recently posted events*/

  editevent(dataobject): void {
    dataobject.eventStartDate = new Date(dataobject.eventStartDate);
    dataobject.eventEndDate = new Date(dataobject.eventEndDate);

    const dialogRef = this.dialog.open(EditpopupmodalComponent, {
      disableClose: true,
      width: '70%',
      height: '80%',
      data: dataobject
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  displayCompleteData(id, categoryId, eventname123, imageornot) {
    // tslint:disable-next-line:max-line-length
    if (eventname123.target.className === 'mat-radio-label-content' || eventname123.target.className === 'mat-radio-outer-circle' || eventname123.target.localName === 'img' || eventname123.target.localName === 'input' || eventname123.target.localName === 'button') {
  if ( imageornot !== 'commentcall') {
    console.log('hello world');
  } else {
    if (this.router.url === '/intranet/forums/newlyadded/newlyaddedallevents') {
      // tslint:disable-next-line:max-line-length
      this.businesslogic.receiveparams({ 'interactioneventId': id, 'category_id': categoryId, 'eventname': this.router.url, 'redirectedFrom': 'interactionForums' });

      this.router.navigate(['intranet/forums/newlyadded/individual-post']);

    } else if (this.router.url === '/intranet/forums/trending/trendingallevents') {
      // tslint:disable-next-line:max-line-length
      this.businesslogic.receiveparams({ 'interactioneventId': id, 'category_id': categoryId, 'eventname': this.router.url, 'redirectedFrom': 'interactionForums' });

      // tslint:disable-next-line:max-line-length
      this.router.navigate(['intranet/forums/trending/individual-post']);

    } else if (this.router.url === '/intranet/forums/mostcommented/mostcommentedallevents')  {
      // tslint:disable-next-line:max-line-length
      this.businesslogic.receiveparams({ 'interactioneventId': id, 'category_id': categoryId, 'eventname': this.router.url, 'redirectedFrom': 'interactionForums' });

      // tslint:disable-next-line:max-line-length
      this.router.navigate(['intranet/forums/mostcommented/individual-post']);

    } else if (this.router.url === '/intranet/forums/classified/classifiedallevents')  {
      // tslint:disable-next-line:max-line-length
      this.businesslogic.receiveparams({ 'interactioneventId': id, 'category_id': categoryId, 'eventname': this.router.url, 'redirectedFrom': 'interactionForums' });

      // tslint:disable-next-line:max-line-length
      this.router.navigate(['intranet/forums/classified/individual-post']);

    } else if (this.router.url === '/intranet/forums/lost&found/lost&foundallevents')  {
      // tslint:disable-next-line:max-line-length
      this.businesslogic.receiveparams({ 'interactioneventId': id, 'category_id': categoryId, 'eventname': this.router.url, 'redirectedFrom': 'interactionForums' });

      // tslint:disable-next-line:max-line-length
      this.router.navigate(['intranet/forums/lost&found/individual-post']);

    } else if (this.router.url === '/intranet/forums/polling/pollingallevents')  {
      // tslint:disable-next-line:max-line-length
      this.businesslogic.receiveparams({ 'interactioneventId': id, 'category_id': categoryId, 'eventname': this.router.url, 'redirectedFrom': 'interactionForums' });

      // tslint:disable-next-line:max-line-length
      this.router.navigate(['intranet/forums/polling/individual-post']);

    }
  }
    } else {
      if (this.router.url === '/intranet/forums/newlyadded/newlyaddedallevents') {
        // tslint:disable-next-line:max-line-length
        this.businesslogic.receiveparams({ 'interactioneventId': id, 'category_id': categoryId, 'eventname': this.router.url, 'redirectedFrom': 'interactionForums' });

        this.router.navigate(['intranet/forums/newlyadded/individual-post']);

      } else if (this.router.url === '/intranet/forums/trending/trendingallevents') {
        // tslint:disable-next-line:max-line-length
        this.businesslogic.receiveparams({ 'interactioneventId': id, 'category_id': categoryId, 'eventname': this.router.url, 'redirectedFrom': 'interactionForums' });

        // tslint:disable-next-line:max-line-length
        this.router.navigate(['intranet/forums/trending/individual-post']);

      }  else if (this.router.url === '/intranet/forums/mostcommented/mostcommentedallevents')  {
        // tslint:disable-next-line:max-line-length
        this.businesslogic.receiveparams({ 'interactioneventId': id, 'category_id': categoryId, 'eventname': this.router.url, 'redirectedFrom': 'interactionForums' });
        // tslint:disable-next-line:max-line-length
        this.router.navigate(['intranet/forums/mostcommented/individual-post']);
      } else if (this.router.url === '/intranet/forums/classified/classifiedallevents')  {
        // tslint:disable-next-line:max-line-length
        this.businesslogic.receiveparams({ 'interactioneventId': id, 'category_id': categoryId, 'eventname': this.router.url, 'redirectedFrom': 'interactionForums' });
        // tslint:disable-next-line:max-line-length
        this.router.navigate(['intranet/forums/classified/individual-post']);
      } else if (this.router.url === '/intranet/forums/lost&found/lost&foundallevents')  {
        // tslint:disable-next-line:max-line-length
        this.businesslogic.receiveparams({ 'interactioneventId': id, 'category_id': categoryId, 'eventname': this.router.url, 'redirectedFrom': 'interactionForums' });
        // tslint:disable-next-line:max-line-length
        this.router.navigate(['intranet/forums/lost&found/individual-post']);
      } else if (this.router.url === '/intranet/forums/polling/pollingallevents')  {
        // tslint:disable-next-line:max-line-length
        this.businesslogic.receiveparams({ 'interactioneventId': id, 'category_id': categoryId, 'eventname': this.router.url, 'redirectedFrom': 'interactionForums' });
        // tslint:disable-next-line:max-line-length
        this.router.navigate(['intranet/forums/polling/individual-post']);
      }
    }

  }

  checkForSuggestedDisabled(suggestedtext) {
    if (suggestedtext.trim().length === 0) {
      this.disableSuggestButton = true;
    } else {
      this.disableSuggestButton = false;
    }
  }

  saveSuggestedPollingOption(suggestedtext, eventid, indexvalue) {
    if (suggestedtext.trim().length === 0) {
      this.snackBar.open('Empty text is not allowed', '', { duration: 3000, panelClass: ['warningMessage'] });
    } else {
      this.businesslogic.post('interaction_forums/savePollingSuggestion', {
        'interactionForumsId': eventid,
        'suggestedBy': this.businesslogic.employeeId, 'suggestedOption': suggestedtext
      }).subscribe((response: any) => {
        this.interactiveforumdata[indexvalue].suggestedoption = '';
        this.snackBar.open('Option suggested successfully', '', { duration: 3000, panelClass: ['successMessage'] });
      });
    }
   
  }

  categoryFilter() {
    this.businesslogic.get('interaction_forums/getCategoryDropDown').subscribe((response: any) => {
      this.categoryFilterList = response;
      this.categoryFilterList.unshift(this.newValue);
      console.log('time filter', this.categoryFilterList);
    });
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  startdiscussion(): void {
    const dialogRef = this.dialog.open(InteractionForumsDailogComponent, {
      disableClose: true,
      width: '70%',
      height: '85%',
       data: {name: this.categorySelectedName, for: 'add'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.snackBar.open('Event added successfully', '', { duration: 3000, panelClass: ['successMessage'] });
        this.businesslogic.sendMessage('new data added');
        if (this.router.url === '/intranet/forums/polling/pollingallevents') {
          this.interactiveForumsdata = {
            search: null,
            categoryId: 7,
            pageNo: 1,
            pageSize: 10,
            filterId: 4,
            employeeId: this.businesslogic.employeeId
          };
        } else if (this.router.url === '/intranet/forums/classified/classifiedallevents') {
          this.interactiveForumsdata = {
            search: null,
            categoryId: 6,
            pageNo: 1,
            pageSize: 10,
            filterId: 4,
            employeeId: this.businesslogic.employeeId
          };
        } else if (this.router.url === '/intranet/forums/lost&found/lost&foundallevents') {
          this.interactiveForumsdata = {
            search: null,
            categoryId: 8,
            pageNo: 1,
            pageSize: 10,
            filterId: 4,
            employeeId: this.businesslogic.employeeId
          };
        } else {
          this.interactiveForumsdata = {
            search: null,
            categoryId: null,
            pageNo: 1,
            pageSize: 10,
            filterId: 4 ,
            employeeId: this.businesslogic.employeeId
          };
        }
        this.interactiveforumdata = [];
        this.interactionForums();
      }

    });
  }


  likedTheEvent(eventid, clddata, likedstatus) {
    this.dummyobject = clddata;
    this.businesslogic.post('interaction_forums/likeOrDislike', {
      'interactionForumsId': eventid, 'employeeId': this.businesslogic.employeeId,
      'liked': likedstatus
    }).subscribe((response: any) => {
      this.dummyobject.liked = response.liked;
      if (response.liked === true) {
        if (this.dummyobject.dislikesCount > 0) {
          this.dummyobject.dislikesCount = this.dummyobject.dislikesCount - 1;
        }
        this.dummyobject.likesCount = this.dummyobject.likesCount + 1;

      } else {
        if (this.dummyobject.likesCount > 0) {
          this.dummyobject.likesCount = this.dummyobject.likesCount - 1;
        }

        this.dummyobject.dislikesCount = this.dummyobject.dislikesCount + 1;
      }
      this.interactiveforumdata.find(item => item.interactionForumsId === response.interactionForumsId).CLDData[0] = this.dummyobject;
    });
  }
  searchAndDurationEvents(searchdata) {
    if (searchdata == null) {
      this.interactiveForumsdata.pageNo = 1;
      this.interactiveforumdata = [];
      this.interactionForums();
      this.clearSearch = true;
    } else {
      if (searchdata.trim().length !== 0 || searchdata === '') {
        this.interactiveForumsdata.pageNo = 1;
        this.interactiveforumdata = [];
        this.interactionForums();
        this.clearSearch = true;
      }
    }



  }

  resetFilters() {
    this.interactiveForumsdata = {
      search: null,
      categoryId: null,
      pageNo: 1,
      pageSize: 10,
      filterId: 4 ,
      employeeId: this.businesslogic.employeeId
    };

    this.interactiveforumdata = [];
    this.interactionForums();
    this.clearSearch = !this.clearSearch;
  }
  gotoEmployeePage(empID) {
    this.router.navigate(['intranet/people/employee', { 'value': true, 'id': empID }]);
  }
  pollOptionSelected(event, option, eventDetails) {
    console.log('event', event);
    this.post_object = {
      optionOptedId: option.optionOptedId,
      optionId: option.optionId,
      optedBy: this.businesslogic.employeeId,
      createdBy: this.businesslogic.employeeId,
      updatedBy: this.businesslogic.employeeId
    };
    this.businesslogic.post('interaction_forums/savePollingOption', this.post_object).subscribe((response: any) => {
      this.businesslogic.postUpdate('interaction_forums/getInteractionForumsDataByID',
        // tslint:disable-next-line:max-line-length
        { 'interactionForumsId': eventDetails.interactionForumsId, 'employeeId': this.businesslogic.employeeId, 'categoryId': eventDetails.categoryId })
        // tslint:disable-next-line:no-shadowed-variable
        .subscribe((response: any) => {
          console.log(response);
          this.interactiveforumdata.map((item, i) => {
            if (item.interactionForumsId === response[0].interactionForumsId) {
              this.interactiveforumdata[i].pollingOptions = response[0].pollingOptions;
              this.interactiveforumdata[i].totalPollingCount = response[0].overallPercentage;

            }
          });
          // tslint:disable-next-line:max-line-length
          // this.interactiveforumdata.find(item => item.interactionForumsId == response[0].interactionForumsId).pollingData =  response[0].pollingData;
        });

    });
  }
}


export interface IYesNo {
  name: string;
  time: Date;
  designation: string;
  location: string;
  pollresponse: string;

}


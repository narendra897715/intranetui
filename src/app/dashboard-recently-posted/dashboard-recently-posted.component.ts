import { Component, OnInit, ViewChild, NgZone, EventEmitter , Output } from '@angular/core';
import { BusinessLogicService } from '../business-logic.service';
import { MatDialog } from '@angular/material';
import { EditpopupmodalComponent } from '../editpopupmodal/editpopupmodal.component';
import { ImageProperties } from '../app.interface';
import { INewimageuploadforexistingarray, IRecentlypostdynamicbinding } from '../app.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { ImagezoompopupComponent } from '../imagezoompopup/imagezoompopup.component';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDailogComponent } from '../confirm-dailog/confirm-dailog.component';
import { MatSnackBar } from '@angular/material';
import { IfStmt } from '@angular/compiler';
import {ImageUploadService} from './../imageUpload.service';
import {notificationDialog} from './../business-logic.service';
@Component({
  selector: 'app-dashboard-recently-posted',
  templateUrl: './dashboard-recently-posted.component.html',
  styleUrls: ['./dashboard-recently-posted.component.scss'],
  /* tslint:disable:use-host-property-decorator */
  host: { 'class': 'section main hbox space-between' }
})
export class DashboardRecentlyPostedComponent implements OnInit {

  @Output() callsubmenu = new EventEmitter();
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;

  changeText: boolean;
  updates = [];
  makeTotalDisplayScreenVisible = false;
  imadezoomdata = [];
  imagedeleted = true;
  totalObjectdata: any;
  imageid: Object;
  deletedimageid: number;
  clearSearch = false;
  imageobject: ImageProperties[] = [];
  timeFilterList: any;
  rowcount = 0;
  subscription: Subscription;
  message: string;
  eventname: any;
  backeventname: string;
  hideEventButton: string;
  noDataAvailableInNandU: boolean;
  showgotoupbutton = false;
  categoryLists: any;
  showEndtime = false;
  showStarttime = true;
  /*Event Fire when scroll reached bottom*/

  imageObjectwithnewseventtid: INewimageuploadforexistingarray = {
    'newsAndUpdatesId': null,
    'imageData': null
  };

  /*Initialization of postobject*/
  recentlyposteddata: IRecentlypostdynamicbinding = {
    search: null,
    filterId: 4,
    pageNo: 1,
    pageSize: 10,
    categoryId: null,
  };
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  gotoupbutton123() {
    this.componentRef.directiveRef.scrollToTop();
    this.showgotoupbutton = false;
  }

  showgotoup(event) {
    if (event.target.scrollTop > 100) {
      this.nz.run(() => {
        this.showgotoupbutton = true;
      });
    } else {
      this.nz.run(() => {
        this.showgotoupbutton = false;
      });

    }
  }


  constructor(private businesslogic: BusinessLogicService, public dialog: MatDialog, public nz: NgZone,
    public router: Router, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer,
    public snackBar: MatSnackBar, public imageuploadservice: ImageUploadService) {
    this.changeText = false;
  }




  /*Event Fire when scroll reached bottom*/
  onScrollEvent(event) {
    if (event.target.scrollTop !== 0 && this.updates.length < this.rowcount) {
      this.recentlyPosted();
    }
  }

  /*Initialization of postobject*/

  ngOnInit() {
    
    this.hideEventButton = this.activatedRoute.snapshot.url[0].path;
    switch (this.activatedRoute.snapshot.url[0].path) {
      case 'all':
        this.eventname = 'news&updates/all';
        break;
      // case 'events':
      //   this.eventname = 'news&updates/eventDetails';
      //   break;
      // case 'managementcommunications':
      //   this.eventname = 'news&updates/managementCommunicationsDetails';
      //   break;
      // case 'awards':
      //   this.eventname = 'news&updates/awardsDetails';
      case 'ceodesk':
        this.eventname = 'news&updates/ceodesk';
        break;
      default:
        this.eventname = 'news&updates/all';
    }
    //   this.router.events.subscribe((res) => {
    //     console.log(this.router.url,"Current URL");
    // })
    if (this.businesslogic.employeeId == null) {
      // tslint:disable-next-line:max-line-length
      this.businesslogic.get('employee/getEmployeeDetailsWithToken').subscribe((response: any) => {
         this.timeFilter();
         this.categoryListmethod();
        this.businesslogic.employeeId = response[0].employeeID;
        this.updates = [];
        this.recentlyPosted();
      });
    } else {
      this.timeFilter();
      this.categoryListmethod();
      this.updates = [];
      this.recentlyPosted();
    }


  }

  categoryListmethod() {
    this.businesslogic.get('news&updates/getCategoryListFilter').subscribe((response: any) => {
      this.categoryLists = response;
    });
  }


  /*Display Recently posted events*/
  recentlyPosted() {
    this.businesslogic.postUpdate(this.eventname, this.recentlyposteddata).subscribe((response: any) => {
      if (response.result.length !== 0) {
        this.noDataAvailableInNandU = false;
        this.recentlyposteddata.pageNo = this.recentlyposteddata.pageNo + 1;
        this.rowcount = response.rowCount;
        this.nz.run(() => {
          if (this.updates.length < this.rowcount) {
            this.updates = this.updates.concat(response.result);
          } else {
            this.updates = response.result;
          }
        });
      } else {
        this.noDataAvailableInNandU = true;
        this.updates = response.result;
      }
    });
  }
  /*Display Recently posted events*/

  /*Event Fire on search and filter dropdown*/
  searcheanddurationvents(searchdata) {
    if (searchdata == null) {
      this.recentlyposteddata.pageNo = 1;
      this.updates = [];
      this.recentlyPosted();
      this.clearSearch = true;
    } else {
      if (searchdata.trim().length !== 0 || searchdata === '') {
        this.recentlyposteddata.pageNo = 1;
        this.updates = [];
        this.recentlyPosted();
        this.clearSearch = true;
      }
    }
  }

  resetFilters() {
    this.recentlyposteddata.search = null;
    this.recentlyposteddata.categoryId = null;
    this.recentlyposteddata.filterId = 4;
    this.recentlyposteddata.pageNo = 1;
    this.recentlyposteddata.pageSize = 10;
    this.clearSearch = !this.clearSearch;
    this.updates = [];
    this.recentlyPosted();
  }
  /*Event Fire on search and filter dropdown*/

  /*PopUp fire when we click on image*/
  zoominimage(index) {
    const dialogRef = this.dialog.open(ImagezoompopupComponent, {
      width: '70%',
      data: { allimagedata: this.imadezoomdata, indexvalue: index },
    });

  }


  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  /*PopUp fire when we click on image*/


  /*post and update in recently post tab*/
  postupdate(dataobject) {
    // const ref = this.dialog.open(PopupModalComponent, {
    //   width: '70%'
    // });
    if (dataobject === 1) {
      const ref = this.dialog.open(EditpopupmodalComponent,
             {disableClose: true, width: '70%', height: '80%', data: { editingdata: dataobject, from: 'news&update' } });
      //  const sub = ref.componentInstance.onAdd.subscribe((data) => {

      ref.afterClosed().subscribe(result => {
        if (result !== undefined) {
          // this.businesslogic.openDialog('Event Added successfully');
          this.snackBar.open('Event added successfully', '', { duration: 3000, panelClass: ['successMessage'] });
          this.businesslogic.sendMessage('new data added');
          this.recentlyposteddata = {
            search: null,
            filterId: 4,
            pageNo: 1,
            pageSize: 10,
          };
          this.updates = [];
          this.recentlyPosted();
        } else {
          console.log('pop up closed');
        }
        //   this.businesslogic.openDialog('Event Added successfully');

        // setTimeout(() => { this.recentlyPosted(); }, 1000);
        //    });
      });
    } else {
      if (dataobject.eventStartDate !== null) {
        dataobject.eventStartDate = new Date(dataobject.eventStartDate);
      }
      if (dataobject.eventEndDate !== null) {
        dataobject.eventEndDate = new Date(dataobject.eventEndDate);
      }
      const dialogRef = this.dialog.open(EditpopupmodalComponent, {
        disableClose: true,
        width: '70%',
        height: '80%',
        data: { editingdata: dataobject, from: 'news&update' }
      });
      // const sub = dialogRef.componentInstance.onEdit.subscribe((data) => {
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          this.snackBar.open('Event updated successfully', '', { duration: 3000, panelClass: ['successMessage'] });
          this.displayCompleteData(dataobject.newsAndUpdatesId);
        } else {
          console.log('popup closed');
        }
      });
    }

  }

  // /*Edit Event(narendra)*/
  // editevent(dataobject): void {
  //   dataobject.eventStartDate = new Date(dataobject.eventStartDate);
  //   dataobject.eventEndDate = new Date(dataobject.eventEndDate);
  //   const dialogRef = this.dialog.open(EditpopupmodalComponent, {
  //     width: '70%',
  //     data: dataobject
  //   });
  //   const sub = dialogRef.componentInstance.onEdit.subscribe((data) => {
  //     this.businesslogic.openDialog('Event Updated successfully');
  //     this.displayCompleteData(data);
  //   });
  // }

  /*post and update in recently post tab*/

  /*Add New image for existing image array code(narendra)*/
  openInput() {
    document.getElementById('upload').click();
  }

  onFileChange(evt, newseventid) {
     this.imageuploadservice.imageupload(evt, this.totalObjectdata.imageData).then((result: any) => {
     this.imageobject = result;
     this.Addimagetoexisting(newseventid);
     }, (error) => {
        console.log(error);
     });
  }


  Addimagetoexisting(newseventid) {
    this.imageObjectwithnewseventtid.newsAndUpdatesId = newseventid;
    this.imageObjectwithnewseventtid.imageData = this.imageobject;
    this.businesslogic.postUpdate('news&updates/uploadImageToExistingPost', this.imageObjectwithnewseventtid).subscribe((response: any) => {
      this.imageobject = [];
      const imageaddeddialogRef = this.dialog.open(notificationDialog, {
       width: '20%',
       data: { name: 'Image added successfully' }
      });
      imageaddeddialogRef.afterClosed().subscribe(result => {
          this.displayCompleteData(newseventid);
      });
    });
  }

  /*Add New image for existing image array code(narendra)*/


  /*Go back to all events view*/
  gobacktopost() {
    this.makeTotalDisplayScreenVisible = false;
    this.recentlyposteddata.pageNo = 1;
    this.updates = [];
    // console.log(this.recentlyposteddata);
    this.recentlyPosted();
  }
  /*Go back to all events view*/

  /*Display individual event complete data*/
  displayCompleteData(eventid) {
      this.businesslogic.postUpdate('news&updates/recentlyPostedDetailsByID',
                                  { 'newsAndUpdatesId': eventid }).subscribe((response: any) => {
      this.makeTotalDisplayScreenVisible = true;
      this.imadezoomdata = [];
      this.totalObjectdata = response[0];
      this.makeimagebase64valid(response[0].imageData);
    });

  }

  gotodiscussionpage(url, eventinfo) {
    if (url === 'newlyadded/individual-post') {
      this.backeventname = 'intranet/forums/newlyadded/newlyaddedallevents';

    } else {
      this.backeventname = 'intranet/forums/trending/trendingallevents';
    }
    // tslint:disable-next-line:max-line-length
    this.businesslogic.receiveparams({ newsAndUpdatesId: eventinfo.newsAndUpdatesId, enteredTheDiscussion: eventinfo.enteredTheDiscussion, createdBy: eventinfo.createdBy, updatedBy: eventinfo.updatedBy, redirectedFrom: 'newsandupdates', eventname: this.backeventname, interactionForumsId: eventinfo.interactionForumsId });
    this.router.navigate(['intranet/forums/' + url]);
  }
  /*Display individualevent complete data*/

  /*make array ready for image zoom event*/

  makeimagebase64valid(imagearray) {
    imagearray.forEach(element => {
      this.imadezoomdata.push(element.image);
    });
  }
  /*make array ready for image zoom event*/

  /*Edit Event(narendra)*/

  /*Delete image from existing image array*/
  deleteimage(eventid, imageid) {
    const dialogRef = this.dialog.open(ConfirmDailogComponent, { width: '20%', data: { warning: 'Are you sure you want to delete ?' } });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        imageid = { 'imageId': imageid };
        this.businesslogic.postUpdate('news&updates/deleteImage', imageid).subscribe((response: any) => {
          this.snackBar.open('Image deleted successfully', '', { duration: 3000, panelClass: ['successMessage'] });
          // this.businesslogic.openDialog('Deleted successfully');
          this.displayCompleteData(eventid);
        });
      }
    });

  }
  /*Delete image from existing image array*/

  /*Event fire for filter dropdown*/
  timeFilter() {
    this.businesslogic.get('news&updates/newsAndUpdatesFilter').subscribe((response: any) => {
      this.timeFilterList = response;
    });
  }
  /*Event fire for filter dropdown*/


  gotoEmployeePage(empID) {
    this.router.navigate(['intranet/people/employee', { 'value': true, 'id': empID }]);
  }
}



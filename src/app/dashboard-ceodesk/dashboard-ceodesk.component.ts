import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
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

@Component({
  selector: 'app-dashboard-ceodesk',
  templateUrl: './dashboard-ceodesk.component.html',
  styleUrls: ['./dashboard-ceodesk.component.scss'],
  /* tslint:disable:use-host-property-decorator */
  host: { 'class': 'section main hbox space-between' }
})
export class DashboardCeodeskComponent implements OnInit {
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;

  changeText: boolean;
  updates = [];
  makeTotalDisplayScreenVisible = false;
  imadezoomdata = [];
  imagedeleted = true;
  totalObjectdata: any;
  imageid: Object;
  deletedimageid: number;
  imageobject: ImageProperties[] = [];
  file: any;
  timeFilterList: any;
  rowcount = 0;
  imageformat: string;
  subscription: Subscription;
  message: string;
  eventname: any;
  backeventname: string;
  count = 0;
  sizeexceedsfilename: string = null;
  onlyimagewarning: string = null;
  hideEventButton: string;
  noDataAvailableInNandU: boolean;
  showgotoupbutton = false;
  categoryLists: any;
  showEndtime = false;
  showStarttime = true;

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
    public snackBar: MatSnackBar) {
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

    if (this.businesslogic.employeeId == null) {
      // tslint:disable-next-line:max-line-length
      this.businesslogic.get('employee/getEmployeeDetailsWithToken').subscribe((response: any) => {
        this.businesslogic.isSuperAdmin = response[0].isSuperAdmin;
        this.timeFilter();
        this.updates = [];
        this.recentlyPosted();
      });
    } else {
      this.updates = [];
      this.timeFilter();
      this.recentlyPosted();
    }

    // this.businesslogic.get('news&updates/getCategoryList').subscribe((response: any) => {
    //   this.categoryLists = response;
    // });

  }

  /*Display Recently posted events*/
  recentlyPosted() {
    this.businesslogic.postUpdate('news&updates/ceoDesk', this.recentlyposteddata).subscribe((response: any) => {
     
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
    } else {
      if (searchdata.trim().length !== 0 || searchdata === '') {
        this.recentlyposteddata.pageNo = 1;
        this.updates = [];
        this.recentlyPosted();
      }
    }
  }
  /*Event Fire on search and filter dropdown*/

  /*PopUp fire when we click on image*/
  zoominimage(index) {
    const dialogRef = this.dialog.open(ImagezoompopupComponent, {
      disableClose: true,
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
    console.log(dataobject);
    // const ref = this.dialog.open(PopupModalComponent, {
    //   width: '70%'
    // });
    if (dataobject === 2) {
      // tslint:disable-next-line:max-line-length
      const ref = this.dialog.open(EditpopupmodalComponent, {disableClose: true, width: '70%', height: '80%', data: { editingdata: dataobject, from: 'ceodesk' } });
      //  const sub = ref.componentInstance.onAdd.subscribe((data) => {

      ref.afterClosed().subscribe(result => {
        if (result !== undefined) {
          // this.businesslogic.openDialog('Event Added successfully');
          this.snackBar.open('Event added successfully', '', { duration: 3000, panelClass: ['successMessage'] });
          this.recentlyposteddata = {
            search: null,
            filterId: 4,
            pageNo: 1,
            pageSize: 10,
            categoryId: 9,
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
        data: { editingdata: dataobject, from: 'ceodesk' }
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
    this.count = 0;
    const files = evt.target.files;
    if (files.length + this.totalObjectdata.imageData.length > 5) {
      this.snackBar.open('Max of 5 images can be uploaded', '', { duration: 3000, panelClass: ['warningMessage'] });
    } else {
      for (let i = 0; i < files.length; i++) {
        if (files[i].type.indexOf('image') === -1) {
          this.snackBar.open('Accepts images only', '', { duration: 3000, panelClass: ['warningMessage'] });
          this.count = 1;
          break;
        } else if (files[i].size > 1000000) {
          this.count = 1;
          // this.onlyimagewarning = null;
          this.snackBar.open(files[i].name + ' ' + 'exceeds size limit', '', { duration: 3000, panelClass: ['warningMessage'] });
          // this.sizeexceedsfilename = files[i].name;
          break;
        }

      }
      if (this.count === 0) {
        // this.onlyimagewarning = null;
        // this.sizeexceedsfilename = null;
        if (files) {
          for (let i = 0; i < files.length; i++) {
            this.file = files[i];
            const reader = new FileReader();
            reader.onload = this._handleReaderLoaded.bind(this, files.length, i, files[i], newseventid);
            reader.readAsBinaryString(this.file);
          }
        }
      }
    }

  }



  _handleReaderLoaded(lengthoffiles, ivalue, filevalue, newseventid, readerEvt) {
    const binaryString = readerEvt.target.result;
    this.imageobject.push({
      'imageName': filevalue.name, 'imageType': filevalue.type, 'Image': btoa(binaryString),
      'updatedBy': this.businesslogic.employeeId, 'createdBy': this.businesslogic.employeeId
    });
    if (ivalue + 1 === lengthoffiles) {
      this.Addimagetoexisting(newseventid);
    }

  }

  Addimagetoexisting(newseventid) {
    this.imageObjectwithnewseventtid.newsAndUpdatesId = newseventid;
    this.imageObjectwithnewseventtid.imageData = this.imageobject;

    this.businesslogic.postUpdate('news&updates/uploadImageToExistingPost', this.imageObjectwithnewseventtid).subscribe((response: any) => {
      // this.businesslogic.openDialog('Added image successfully');
      this.imageobject = [];
      this.snackBar.open('Image added successfully', '', { duration: 3000, panelClass: ['successMessage'] });
      this.displayCompleteData(newseventid);
      // console.log("image added data :",response);
      // setTimeout(this.displayCompleteData(newseventid),5000);
      // this.subscription = this.businesslogic.getMessage().subscribe(message => {
      //   this.displayCompleteData(newseventid);
      // });
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

    this.businesslogic.postUpdate('news&updates/recentlyPostedDetailsByID', { 'newsAndUpdatesId': eventid }).subscribe((response: any) => {
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
    this.imageformat = 'data:image/png;base64,';
    for (let i = 0; i < imagearray.length; i++) {
      this.imadezoomdata.push(this.imageformat + imagearray[i].image);
    }
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
          this.snackBar.open('Image Deleted successfully', '', { duration: 3000, panelClass: ['successMessage'] });
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




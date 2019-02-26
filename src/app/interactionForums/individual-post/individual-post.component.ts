import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { BusinessLogicService } from '../../business-logic.service';
import { MatDialog } from '@angular/material';
import { EditpopupmodalComponent } from '../../editpopupmodal/editpopupmodal.component';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { IinteractionForumEventCompleteData, ImageProperties, INewimageuploadforexistingarrayForIF, ISuggestedOption } from '../../app.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { EditDailogForPollingeventComponent } from '../edit-dailog-for-pollingevent/edit-dailog-for-pollingevent.component';
import { InteractionForumsDailogComponent } from '../interaction-forums-dailog/interaction-forums-dailog.component';
import { ImagezoompopupComponent } from '../../imagezoompopup/imagezoompopup.component';
import * as XLSX from 'xlsx/types';
import { ConfirmDailogComponent } from '../../confirm-dailog/confirm-dailog.component';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

import { filter } from 'rxjs/operators';
import { pairwise } from 'rxjs/operators';
import { Location } from '@angular/common';
import { ImageUploadService } from './../../imageUpload.service';
import { notificationDialog } from './../../business-logic.service';
@Component({
  selector: 'app-individual-post',
  templateUrl: './individual-post.component.html',
  styleUrls: ['./individual-post.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: { 'class': 'section main hbox space-between' }
})
export class IndividualPostComponent implements OnInit {


  displayedColumns: string[] = ['name', 'designation', 'time', 'location', 'pollresponse'];
  displaySuggestedOptionColumns: string[] = ['employeename', 'suggestedoption', 'suggestedtime'];
  dataSource = new MatTableDataSource<IYesNo>();
  suggestedoptiondataSource = new MatTableDataSource<ISuggestedOption>();
  @ViewChild(MatPaginator) suggestedoptionpaginator: MatPaginator;
  @ViewChild(MatSort) suggestedoptionsort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  todayDate = new Date().getTime();
  // tslint:disable-next-line:max-line-length
  completeObjectData: IinteractionForumEventCompleteData = { interactionForumsId: null, overallPercentage: null, totalPollingCount: null, newsAndUpdatesId: null, eventName: null, categoryId: null, updatedByName: null, CLDData: [], updatedDate: null, createdDate: null, eventDescription: null, commentsData: [], createdByName: null, eventStartDate: null, eventEndDate: null, pollingOptions: [], mail: null, skype: null, pollingEmployeeInfo: [], imageData: [], createdBy: null };
  optionsView = true;
  tableView = false;
  votingSelected = true;
  post_object: any;
  vote = true;
  optionSelected: number;
  interactionTableId: any;
  elementId: any;
  category_id: any;
  dummyobject: any;
  eventname: string;
  excelcode: any;
  disableCommentButton = true;
  imadezoomdata = [];
  imageformat: string;
  imageobject: ImageProperties[] = [];
  suggestedOptionTable = false;
  polledemployeesdata = false;
  subscription: Subscription;
  redirectionfrom: string;
  previousUrl: string;
  hideAllEditButtons: boolean;
  showEndtime = false;
  showStarttime = true;
  newComment: any =
    [{
      id: '',
      author: '',
      name: '',
      email: '',
      content: ''
    }];
  imageObjectwithnewseventtid: INewimageuploadforexistingarrayForIF = {
    'interactionForumsId': null,
    'imageData': null
  };
  constructor(private route: ActivatedRoute, public businesslogic: BusinessLogicService, private router: Router,
    public dialog: MatDialog, private sanitizer: DomSanitizer, public nz: NgZone, public snackBar: MatSnackBar,
    private _location: Location, public imageuploadservice: ImageUploadService) {
    this.businesslogic.socket.on('newComment', (interactionid) => {
      console.log('socket called');
      if (interactionid === this.completeObjectData.interactionForumsId) {
        if (this.redirectionfrom === 'interactionForums') {
          this.displayCompleteDataforinteractionforums();
        } else {
          this.displayCompleteDataFornewsandupdate();
        }
        this.newComment.content = '';
        this.disableCommentButton = true;
      }
    });
  }
  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   this.eventname = params.eventname;
    //   this.redirectionfrom = params.redirectedFrom;
    //   if (params.redirectedFrom === 'interactionForums') {
    //     this.displayCompleteDataforinteractionforums();
    //   } else {
    //     this.displayCompleteDataFornewsandupdate();
    //   }
    // });
    // this.router.events
    //         .pipe(filter((e: any) => e instanceof RoutesRecognized),
    //             pairwise()
    //         ).subscribe((e: any) => {
    //           this.previousUrl = e[0].urlAfterRedirects;
    //           //  console.log(e[0].urlAfterRedirects); // previous url
    //         });

    if (this.businesslogic.queryParams !== undefined) {
      this.eventname = this.businesslogic.queryParams.eventname;
      this.redirectionfrom = this.businesslogic.queryParams.redirectedFrom;
      if (this.redirectionfrom === 'interactionForums') {
        this.displayCompleteDataforinteractionforums();
      } else {
        this.displayCompleteDataFornewsandupdate();
      }
    } else {
      this._location.back();
    }
  }


  editevent(dataobject): void {
    console.log(dataobject);
    if (dataobject.eventStartDate !== null) {
      dataobject.eventStartDate = new Date(dataobject.eventStartDate);
    }
    if (dataobject.eventEndDate !== null) {
      dataobject.eventEndDate = new Date(dataobject.eventEndDate);
    }

    if (dataobject.categoryId !== 7) {
      const dialogRef = this.dialog.open(EditpopupmodalComponent, {
        disableClose: true,
        width: '70%', height: '80%',
        data: { editingdata: dataobject, from: 'interactionForums' }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          this.snackBar.open('Event updated successfully', '', { duration: 3000, panelClass: ['successMessage'] });
          this.displayCompleteDataforinteractionforums();
        } else {
          console.log('popup closed');
        }

      });
    } else {

      const dialogRef = this.dialog.open(InteractionForumsDailogComponent, {
        disableClose: true,
        width: '70%', height: '80%',
        data: { editingdata: dataobject, for: 'edit' }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          this.snackBar.open('Event updated successfully', '', { duration: 3000, panelClass: ['successMessage'] });
          this.displayCompleteDataforinteractionforums();
        } else {
          console.log('popup closed');
        }
      });
    }

  }

  checkForCommentDisabled(commentcontent) {
    if (commentcontent.trim().length === 0) {
      this.disableCommentButton = true;
    } else {
      this.disableCommentButton = false;
    }
  }

  displayCompleteDataforinteractionforums() {
    this.businesslogic.postUpdate('interaction_forums/getInteractionForumsDataByID',
      {
        'interactionForumsId': this.businesslogic.queryParams.interactioneventId,
        'employeeId': this.businesslogic.employeeId,
        'categoryId': this.businesslogic.queryParams.category_id
      }).subscribe((response: any) => {
        this.completeObjectData = response[0];
        if (this.completeObjectData.eventStartDate != null) {
          if (new Date(response[0].eventStartDate).getMinutes() !== 0 || new Date(response[0].eventStartDate).getHours() !== 0) {
            this.showStarttime = true;
          } else {
            this.showStarttime = false;
          }
        }
        if (this.completeObjectData.eventEndDate != null) {
          if (new Date(response[0].eventEndDate).getMinutes() !== 0 || new Date(response[0].eventEndDate).getHours() !== 0) {
            this.showEndtime = true;
          } else {
            this.showEndtime = false;
          }
        }
        this.imadezoomdata = [];
        this.makeimagebase64valid(response[0].imageData);
        if (this.completeObjectData.createdBy === this.businesslogic.employeeId
          || this.businesslogic.isAdmin || this.businesslogic.isSuperAdmin) {
          this.hideAllEditButtons = true;
        } else {
          this.hideAllEditButtons = false;
        }
        if (this.completeObjectData.categoryId === 7) {
          for (let i = 0; i < this.completeObjectData.pollingOptions.length; i++) {
            if (this.completeObjectData.pollingOptions[i].OptionOpted === true) {
              this.optionSelected = this.completeObjectData.pollingOptions[i].optionId;
            }
          }
        }
        this.dataSource = new MatTableDataSource(<IYesNo[]>this.completeObjectData.pollingEmployeeInfo);
      });
  }

  /*make array ready for image zoom event*/

  makeimagebase64valid(imagearray) {
    imagearray.forEach(element => {
      this.imadezoomdata.push(element.image);
    });
  }
  /*make array ready for image zoom event*/
  /*Delete image from existing image array*/
  deleteimage(imageid) {
    const dialogRef = this.dialog.open(ConfirmDailogComponent, { width: '20%', data: { warning: 'Are you sure you want to delete ?' } });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        imageid = { 'imageId': imageid };
        this.businesslogic.postUpdate('news&updates/deleteImage', imageid).subscribe((response: any) => {
          this.snackBar.open('Image deleted successfully', '', { duration: 3000, panelClass: ['successMessage'] });
          this.displayCompleteDataforinteractionforums();
        });
      }
    });
  }
  /*Delete image from existing image array*/

  displayCompleteDataFornewsandupdate() {
    this.businesslogic.postUpdate('interaction_forums/startOrJoinDiscussion',
      {
        'newsAndUpdatesId': this.businesslogic.queryParams.newsAndUpdatesId,
        'employeeId': this.businesslogic.employeeId,
        'createdBy': this.businesslogic.queryParams.createdBy,
        'updatedBy': this.businesslogic.queryParams.updatedBy,
        'enteredTheDiscussion': this.businesslogic.queryParams.enteredTheDiscussion,
        'interactionForumsId': this.businesslogic.queryParams.interactionForumsId
      }).subscribe((response: any) => {
        this.completeObjectData = response[0];
        if (this.completeObjectData.eventStartDate != null) {
          if (new Date(response[0].eventStartDate).getMinutes() !== 0 || new Date(response[0].eventStartDate).getHours() !== 0) {
            this.showStarttime = true;
          } else {
            this.showStarttime = false;
          }
        }
        if (this.completeObjectData.eventEndDate != null) {
          if (new Date(response[0].eventEndDate).getMinutes() !== 0 || new Date(response[0].eventEndDate).getHours() !== 0) {
            this.showEndtime = true;
          } else {
            this.showEndtime = false;
          }
        }
        if (this.completeObjectData.createdBy === this.businesslogic.employeeId
          && this.completeObjectData.categoryId !== 7 && this.completeObjectData.newsAndUpdatesId == null) {
          this.hideAllEditButtons = true;
        } else {
          this.hideAllEditButtons = false;
        }
        this.imadezoomdata = [];
        this.makeimagebase64valid(response[0].imageData);
        this.dataSource = new MatTableDataSource(<IYesNo[]>this.completeObjectData.pollingEmployeeInfo);
      });
    // tslint:disable-next-line:max-line-length
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  likedTheEvent(eventid, clddata, likedstatus) {
    this.dummyobject = clddata;
    this.businesslogic.post('interaction_forums/likeOrDislike',
      {
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
        this.completeObjectData.CLDData[0] = this.dummyobject;
        // this.interactiveforumdata.find(item => item.interactionForumsId == response.interactionForumsId).CLDData[0] = this.dummyobject;
      });
  }

  pollOptionSelected(event, option) {
    console.log('event', event);
    this.post_object = {
      optionOptedId: option.optionOptedId,
      optionId: option.optionId,
      optedBy: this.businesslogic.employeeId,
      createdBy: this.businesslogic.employeeId,
      updatedBy: this.businesslogic.employeeId
    };
    this.businesslogic.post('interaction_forums/savePollingOption', this.post_object).subscribe((response: any) => {
      this.displayCompleteDataforinteractionforums();
    });
  }

  addNewComment(commentcontent, interactionId) {
    this.businesslogic.post('interaction_forums/comments',
      {
        'interactionForumsId': interactionId,
        'employeeId': this.businesslogic.employeeId,
        'commentContent': commentcontent,
        'createdBy': this.businesslogic.employeeId,
        'updatedBy': this.businesslogic.employeeId
      }).subscribe((response: any) => {
        // this.displayCompleteDataforinteractionforums();
        // this.newComment.content = '';
      });
  }

  /*PopUp fire when we click on image*/
  zoominimage(index) {
    const dialogRef = this.dialog.open(ImagezoompopupComponent, {
      width: '70%',
      data: { allimagedata: this.imadezoomdata, indexvalue: index },
    });

  }

  /*Add New image for existing image array code(narendra)*/
  openInput() {
    document.getElementById('upload').click();
  }

  onFileChange(evt, newseventid) {
    this.imageuploadservice.imageupload(evt, this.completeObjectData.imageData).then((result: any) => {
      this.imageobject = result;
      this.Addimagetoexisting(newseventid);
    }, (error) => {
      console.log(error);
    });

  }

  Addimagetoexisting(newseventid) {
    this.imageObjectwithnewseventtid.interactionForumsId = newseventid;
    this.imageObjectwithnewseventtid.imageData = this.imageobject;

    this.businesslogic.postUpdate('interaction_forums/uploadImageToExistingDiscussion',
      this.imageObjectwithnewseventtid).subscribe((response: any) => {
        this.imageobject = [];
        const imageaddeddialogRef = this.dialog.open(notificationDialog, {
          width: '20%',
          data: { name: 'Image added successfully' }
        });
        imageaddeddialogRef.afterClosed().subscribe(result => {
          this.displayCompleteDataforinteractionforums();
        });



      });
  }

  /*Add New image for existing image array code(narendra)*/

  refreshcomments(interactionid) {
    this.businesslogic.post('interaction_forums/getCommentsDataById', { 'interactionForumsId': interactionid }).subscribe((response: any) => {
      this.nz.run(() => {
        this.completeObjectData.commentsData = response;
        this.newComment.content = '';
      });
      // console.log(response);
    });
  }

  gotoforum() {
    if (this.optionsView === false) {
       this.optionsView = true;
       this.polledemployeesdata = false;
       this.suggestedOptionTable = false;
    } else {
      this.router.navigate([this.eventname]);
    }
  
  }
  gotoEmployeePage(empID) {
    this.router.navigate(['intranet/people/employee', { 'value': true, 'id': empID }]);
  }
  showDetails(interactionid) {
    this.optionsView = false;
    this.polledemployeesdata = true;
    // this.tableView = !this.tableView;
    this.votingSelectionChanged(interactionid, this.optionSelected);
  }
  showSuggestedOption(interactionid) {
    this.optionsView = false;
    this.suggestedOptionTable = true;
    this.businesslogic.post('interaction_forums/pollingSuggestions ', {'interactionForumsId': interactionid}).subscribe((response: any) => {
      this.suggestedoptiondataSource = new MatTableDataSource(<ISuggestedOption[]>response);
      this.suggestedoptiondataSource.paginator = this.suggestedoptionpaginator;
      this.suggestedoptiondataSource.sort = this.suggestedoptionsort;
    });
  }

  votingSelectionChanged(interactionid, selectedoptionid) {
    // tslint:disable-next-line:max-line-length
    this.businesslogic.post('interaction_forums/getPollingEmployeeInfo', { 'interactionForumsId': interactionid, 'optionId': selectedoptionid }).subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(<IYesNo[]>response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  searchsuggestedoption(searcheddata) {
    searcheddata = searcheddata.trim(); // Remove whitespace
    searcheddata = searcheddata.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.suggestedoptiondataSource.filter = searcheddata;
  }

  // Downloadexcel(id) {
  //   this.businesslogic.post('interaction_forums/pollingExcelDownload', { 'interactionForumsId': id }).subscribe((response: any) => {
  //     // this.url_newTab = response;
  //     const workBook = XLSX.utils.book_new(); // create a new blank book
  //     const workSheet = XLSX.utils.json_to_sheet(response);
  //     const wscols = [
  //       {wch: 20},
  //       {wch: 30},
  //       {wch: 20},
  //       {wch: 20},
  //       {wch: 20},
  //       {wch: 20},

  //   ];
  //   const wsrows = [
  //     {hpx: 24, level: 2},

  //   ];

  //   workSheet['!rows'] = wsrows;
  //   workSheet['!cols'] = wscols;
  //     XLSX.utils.book_append_sheet(workBook, workSheet, 'polling.xlsx'); // add the worksheet to the book
  //     XLSX.writeFile(workBook, 'polling.xlsx'); // initiate a file download in browser
  //   });

  // }

}


export interface IYesNo {
  name: string;
  time: Date;
  designation: string;
  location: string;
  pollresponse: string;
}

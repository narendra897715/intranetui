import { Component, OnInit, NgZone } from '@angular/core';
import { BusinessLogicService } from '../../business-logic.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UploadPopupComponent } from './upload-popup/upload-popup.component';
import { IFormsObject } from '../../app.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { Element } from '@angular/compiler/src/render3/r3_ast';
import { Subscription } from 'rxjs';
import { IfStmt } from '@angular/compiler';
import { ConfirmDailogComponent } from '../../confirm-dailog/confirm-dailog.component';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-polices-forms',
  templateUrl: './polices-forms.component.html',
  styleUrls: ['./polices-forms.component.scss'],
   // tslint:disable-next-line:use-host-property-decorator
  host: { 'class': 'section main hbox space-between' }
})
export class PolicesFormsComponent implements OnInit {
  sortBy: any;
  code: any;
  documentData = [];
  url_newTab: any;
  // formsData: IFormsObject[];
  formsData: IFormsObject = {
    search: null,
    categoryId: null,
    pageNo: 1,
    pageSize: 18,
  };
  rowcount = 0;
  pdfcode: any;
  fileUrl: any;
  eventname: any;
  servicename: any;
  subscription: Subscription;
  noDataAvailableInResources: boolean;
  constructor(public businesslogic: BusinessLogicService, private router: Router, private route: ActivatedRoute,
    public dialog: MatDialog, public nz: NgZone, private sanitizer: DomSanitizer, public snackBar: MatSnackBar) {
   }

  ngOnInit() {
    //  this.policies_forms_Data();
    this.getCategory();
    switch (this.route.snapshot.url[0].path) {
      case 'policies':
          this.eventname = 'resources/getResourcesPolicies';
          break;
      case 'forms':
          this.eventname = 'resources/getResourcesForms';
          break;
          case 'l&d':
          this.eventname = 'resources/getResourcesL&D';
          break;
      default:
      this.eventname = 'resources/getResourcesPolicies';
  }
  this.businesslogic.get('employee/getEmployeeDetailsWithToken'
                          ).subscribe((response: any) => {
    this.businesslogic.employeeId = response[0].employeeID;
    this.documentData = [];
    this.policies_forms_Data();
  // this.businesslogic.employeeIdChange(this.userdata.employeeID,this.userdata.isAdmin);
  });
 }

  uploadPopup() {
    const dialogRef = this.dialog.open(UploadPopupComponent, {disableClose: true,
       width: '50%', height: '65%', data: {name: this.eventname} });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      // if (result === 1) {
      //   console.log(true);
      //   this.servicename = 'resources/getResourcesPolicies';
      //   this.policies_forms_Data();
      // } else {
      //   console.log(false);
      //   this.servicename = 'resources/getResourcesForms';
      //   this.policies_forms_Data();
      // }
      if (result !== undefined) {
        // this.businesslogic.openDialog('File Uploaded  successfully');
        this.snackBar.open('File uploaded  successfully', '', { duration: 3000, panelClass: ['successMessage']  });
        this.formsData = {
          search: null,
          categoryId: null,
          pageNo: 1,
          pageSize: 18,
        };
        this.documentData = [];
        this.policies_forms_Data();
          // this.subscription = this.businesslogic.getMessage().subscribe(message => {
         // });
      }
    });
  }

  searchandfilterforms(searchdata) {
    if (searchdata == null) {
      this.formsData.pageNo = 1;
      this.documentData = [];
      console.log('id', this.formsData.categoryId);
      this.policies_forms_Data();
    } else {
      if (searchdata.trim().length !== 0 || searchdata === '') {
        this.formsData.pageNo = 1;
        this.documentData = [];
        console.log('id', this.formsData.categoryId);
        this.policies_forms_Data();
      }
    }
  }

  /*Method call when scroll reaches bottom */
  onScrollEvent(event) {
    if (event.target.scrollTop !== 0 && this.documentData.length < this.rowcount) {
      this.policies_forms_Data();
    }
  }
  /*Method call when scroll reaches bottom */

  getCategory() {
    this.businesslogic.get('resources/getCategoryDropDown').subscribe((response: IFilter[]) => {
      this.sortBy = response;
    });
  }

  policies_forms_Data() {
    this.businesslogic.post(this.eventname, this.formsData).subscribe((response: any) => {
      // this.arrayObject = response.result;
    
      if (response.result.length !== 0) {
        this.noDataAvailableInResources = false;
        this.formsData.pageNo = this.formsData.pageNo + 1;
        this.rowcount = response.rowCount;

        this.nz.run(() => {
          if (this.documentData.length < this.rowcount) {
            this.documentData = this.documentData.concat(response.result);
          } else {
            this.documentData = response.result;
          }
        });
      } else {
        this.noDataAvailableInResources = true;
        this.documentData = response.result;
      }
    });
  }

  deleteFile(fileId) {
    const dialogRef = this.dialog.open(ConfirmDailogComponent, { width: '20%', data : {warning: 'Are you sure you want to delete ?'}});
    dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
            this.businesslogic.post('resources/deleteFile', { 'fileId': fileId }).subscribe((response: any) => {
              // this.businesslogic.openDialog('Document deleted successfully');
              this.snackBar.open('Document deleted successfully', '', { duration: 3000, panelClass: ['successMessage']  });
              this.formsData = {
                search: null,
                categoryId: null,
                pageNo: 1,
                pageSize: 18,
              };
              this.documentData = [];
              this.policies_forms_Data();
            });
          }
    });
  }


  downloadPdf(id) {
    //  this.openFileNewTab(id);
    // const pdf = 'data:application/pdf;base64,' + this.pdfcode;
    // const downloadLink = document.getElementById('download');
    // // const fileName = "sample.pdf";

    // downloadLink.href = id;
    // downloadLink.click();
    // const data = 'some text';
    console.log('fileid', id);
    this.businesslogic.post('resources/getFileByID', { 'fileId': id }).subscribe((response: any) => {
      this.url_newTab = response;
      this.pdfcode = 'data:application;base64,' + response[0].files;
      const a = window.document.createElement('a');
      a.href = this.pdfcode;
      a.target = '_blank';
      a.download = response[0].fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  openFileNewTab(id) {
    // console.log('fileid', id);
    // this.businesslogic.post('resources/getFileByID', { 'fileId': id }).subscribe((response: any) => {
    //   this.url_newTab = response;
    //   this.pdfcode = 'data:application;base64,' + response[0].files;
    //   console.log(this.pdfcode);
    //   const a = window.document.createElement('a');
    //   a.href = this.pdfcode;
    //   a.target = '_blank';
    //   //  a.download = 'filename.pdf';
    //   document.body.appendChild(a);
    //   a.click();
    //   document.body.removeChild(a);
    // });

    this.businesslogic.post('resources/getFileByID', { 'fileId': id }).subscribe((response: any) => {
      this.url_newTab = response[0];
      this.pdfcode = 'data:' + response[0].fileType + ';base64,' + response[0].files;
    //  console.log(this.pdfcode);
      // const a = window.document.createElement('a');
      // a.href = this.pdfcode;
      // a.target = '_blank';
      // //  a.download = 'filename.pdf';
      // document.body.appendChild(a);
      // a.click();
      // document.body.removeChild(a);
      // const iframe = "<iframe width='100%' height='100%' src='" + this.pdfcode + "'></iframe>"
      // const x = window.open();
      // x.document.open();
      // x.document.write(iframe);
      // x.document.close();
      const win = window.open();
      if (this.eventname === 'resources/getResourcesForms') {
        win.document.write('<iframe src="' + this.pdfcode  +
        '" frameborder="0"  style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
                                          );
                                          setTimeout(() => { win.stop(); }, 5000);
                                          win.document.title =  this.url_newTab.fileName;
                                           
                                          
      } else {
        win.document.write('<iframe src="' + this.pdfcode  +
        '" frameborder="0"  style="border:0;top:0px;left:0px;margin-top:-50px;bottom:0px;right:0px;width:100%;height:100%;" allowfullscreen></iframe>'
                                          );
                                          setTimeout(() => { win.stop(); }, 5000);
                                          win.document.title =  this.url_newTab.fileName;
      }

    });
  }
}

export interface IDocument {
  fileId: number;
  fileName: string;
  fileType: string;
  resourcesCategoryId: number;
  resourcesCategoryName: string;
  createdBy: number;
  createdByName: string;
  updatedBy: number;
  updatedByName: string;
  createdDate: Date;
  updatedDate: Date;
}


export interface IFilter {
  sortById: number;
  sortingName: number;
}

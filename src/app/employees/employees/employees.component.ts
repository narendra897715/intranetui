import { Component, OnInit, NgZone } from '@angular/core';
import { BusinessLogicService } from '../../business-logic.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AppreciationPopupComponent } from '../appreciation-popup/appreciation-popup.component';
import { DomSanitizer } from '@angular/platform-browser';
import { IEmployeedynamicbinding, IAppreciation, IIndividualEmployeeData, IEmployeeindividualData } from '../../app.interface';
import { ImagezoompopupComponent } from '../../imagezoompopup/imagezoompopup.component';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  /* tslint:disable:use-host-property-decorator */
  host: { 'class': 'section main hbox space-between' }
})
export class EmployeesComponent implements OnInit {
  employeeID: any;
  listview = [];
  clearSearch = false;
  appreciationDetails = [];
  makeTotalDisplayScreenVisible = false;
  appreciationDetailsObject: IAppreciation = {
    employeeId: this.businesslogic.employeeId,
    pageNo: 1,
    pageSize: 10,
  };
  myAppreciation = [];
  WorkLocation: any;
  // dataId = 1;
  sortDetails: any;
  rowcount = 0;
  appreciationrowcount = 0;
  rowcount_appreciation = 0;
  workLocation =
    [{ 'locationId': '1', 'location': 'KKR Square' },
    { 'locationId': '2', 'location': 'Gutenberg' }];
  employeeObjectData: IEmployeedynamicbinding = {
    search: null,
    workLocationId: null,
    sortById: 1,
    pageNo: 1,
    pageSize: 18,
    domainId: null,
  //  designationId: null,
  };
  makeAllEmplyeesAppreciationtab = true;
  makeIndividualtab = false;
  noDataAvailableInEmployees: boolean;
  // tslint:disable-next-line:max-line-length
  details: IEmployeeindividualData = { domain: null, employeeName: null, mail: null, skype: null, designation: null, employeeId: null, dateOfJoining: null, contact: null, technologiesKnown: [], email: null, workLocation: null, reportingManager: null };
  IndividualAppreciation = [];
  id: any;
  domains: any;
  domains_submenu: any;

  constructor(public businesslogic: BusinessLogicService, private router: Router, private route: ActivatedRoute,
    public dialog: MatDialog, private sanitizer: DomSanitizer, public nz: NgZone, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(this.objectSize(params));
      this.id = params.id;
      if (this.objectSize(params) > 0) {
        this.makeTotalDisplayScreenVisible = params.value;
        this.employeeIndividualDetails(params.id);
        // this.selfAppreciations(params.id);
        this.selfAppreciationsIndividualPage(params.id);
        this.employeeSort();
        this.domainList();
      }
      if (this.objectSize(params) === 0) {
        this.makeTotalDisplayScreenVisible = false;
        // tslint:disable-next-line:max-line-length
        if (this.businesslogic.employeeId == null) {
          this.businesslogic.get('employee/getEmployeeDetailsWithToken').subscribe((response: any) => {
            this.businesslogic.employeeId = response[0].employeeID;
            this.employeeData();
            this.employeeSort();
            this.domainList();
            this.appreciationWall();
            this.selfAppreciations(this.businesslogic.employeeId);
            // this.businesslogic.employeeIdChange(this.userdata.employeeID,this.userdata.isAdmin);
          });
        } else {
        this.employeeData();
        this.employeeSort();
        this.domainList();
        this.appreciationWall();
            this.selfAppreciations(this.businesslogic.employeeId);
       }
        // this.appreciationWall();
      }
    });
  }

  objectSize = function (obj) {
    let size = 0, key;
    // tslint:disable-next-line:forin
    for (key in obj) {
      if (obj.hasOwnProperty(key)) { size++; }
    }
    return size;
  };


  /*Method call when scroll reaches bottom */
  onScrollEvent(event) {

    if (event.target.scrollTop !== 0 && this.listview.length < this.rowcount) {
      this.employeeData();
    }
  }

  employeeData() {
    this.businesslogic.postUpdate('employee/getEmployeeDetails', this.employeeObjectData).subscribe((response: any) => {
      // this.listview = response;
      console.log(response);
    
      if (response.result.length !== 0) {
        this.noDataAvailableInEmployees = false;
        this.employeeObjectData.pageNo = this.employeeObjectData.pageNo + 1;
        this.rowcount = response.rowCount;

        this.nz.run(() => {
          if (this.listview.length < this.rowcount) {
            this.listview = this.listview.concat(response.result);
          } else {
            this.listview = response.result;
          }
        });
      } else {
        this.noDataAvailableInEmployees = true;
        this.listview = response.result;
      }

    });
    //  this.appreciationWall();
  }

  // employeeIndividualDetails(empID) {
  //   this.router.navigate(['intranet/people/employee-page', {
  //     'data': empID, 'employeesearch': JSON.parse(this.employeeObjectData.search),
  //     'employeeWLID': this.employeeObjectData.workLocationId, 'employeeSortID': this.employeeObjectData.sortById
  //   }]);
  // }

  /*Method call when scroll reaches bottom */
  onScrollAppreciationEvent(event) {
    if (event.target.scrollTop !== 0 && this.appreciationDetails.length < this.rowcount_appreciation) {
      this.appreciationWall();
    }
  }

  appreciationWall() {
    //   this.businesslogic.get('employee/getAppreciations').subscribe((response: any) => {
    //     this.appreciationDetails = response;
    // //    console.log(typeof this.appreciationDetails.skype);
    // //    const sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(this.appreciationDetails.skype);
    //   });
    this.appreciationDetailsObject.employeeId = this.businesslogic.employeeId;
    this.businesslogic.postUpdate('employee/getAppreciations', this.appreciationDetailsObject).subscribe((response: any) => {
      
      if (response.result.length !== 0) {
        this.appreciationDetailsObject.pageNo = this.appreciationDetailsObject.pageNo + 1;
        this.rowcount_appreciation = response.rowCount;

        this.nz.run(() => {
          // if (this.appreciationDetailsObject.search == null || this.appreciationDetailsObject.search === '') {
          //   this.listview = this.listview.concat(response.result);
          // } else {
          this.appreciationDetails = this.appreciationDetails.concat(response.result);
          //   }
        });
      } else {
        this.appreciationDetails = response.result;
      }

    });
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  selfAppreciations(empID) {
    this.businesslogic.post('employee/getAppreciationsById', { 'employeeId': empID }).subscribe((response: any) => {
      this.IndividualAppreciation = response;
    });
  }

  appreciationPopup() {
    if (!this.makeTotalDisplayScreenVisible) {
      console.log(true);
      const dialogRef = this.dialog.open(AppreciationPopupComponent, {disableClose: true,
         width: '60%', data: { EMPID: '', name: '', mailId: '' } });
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          this.snackBar.open('Appreciation sent successfully', '', { duration: 5000, panelClass: ['successMessage'] });
          this.appreciationDetails = [];
          this.appreciationDetailsObject.pageNo = 1;
          this.appreciationDetailsObject.pageSize = 10;
          setTimeout(() => { this.appreciationWall(); }, 1000);
        }
      });
    } else if (this.makeTotalDisplayScreenVisible) {
      console.log(this.id);
      // this.employeeIndividualDetails(this.id);
      // tslint:disable-next-line:max-line-length
      const dialogRef = this.dialog.open(AppreciationPopupComponent, {disableClose: true, width: '60%', data: { EMPID: this.employeeID, name: this.details.employeeName, mailId: this.details.email } });
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          this.snackBar.open('Appreciation sent successfully', '', { duration: 5000, panelClass: ['successMessage'] });
          this.appreciationWall();
          this.selfAppreciationsIndividualPage(this.employeeID ? this.employeeID : this.id);
          //  this.selfAppreciations(this.businesslogic.employeeId ? this.businesslogic.employeeId : this.id);
        }
      });
    }
  }

  public changeShowStatus(expand) {
    expand = !expand;
  }

  /*Method calls for filters*/

  searchFilters(searchdata) {
    if (searchdata == null) {
      this.employeeObjectData.pageNo = 1;
      this.listview = [];
      this.employeeData();
      this.clearSearch = true;
    } else {
      if (searchdata.trim().length !== 0 || searchdata === '') {
        this.employeeObjectData.pageNo = 1;
        this.listview = [];
        this.employeeData();
        this.clearSearch = true;
      }
    }
  }

  resetFilters() {
    this.employeeObjectData.search = null;
    this.employeeObjectData.workLocationId = null;
    this.employeeObjectData.sortById = 1;
    this.employeeObjectData.pageNo = 1;
    this.employeeObjectData.pageSize = 18;
    this.clearSearch = !this.clearSearch;
    this.listview = [];
    this.employeeObjectData.domainId = null;
    this.employeeData();
  }


  employeeSort() {
    this.businesslogic.get('employee/employeeSorting').subscribe((response: any) => {
      this.sortDetails = response;
    });
  }

  allEmployeesAppreciation() {
    this.makeAllEmplyeesAppreciationtab = true;
    this.makeIndividualtab = false;
  }
  individualAppreciation() {
    this.makeIndividualtab = true;
    this.makeAllEmplyeesAppreciationtab = false;
  }


  employeeIndividualDetails(empID) {
    this.makeTotalDisplayScreenVisible = true;
    this.employeeID = empID;
    this.businesslogic.post('employee/getEmployeeDetailsById', { 'employeeId': empID }).subscribe((response: IIndividualEmployeeData) => {
      this.details = response[0];
      this.selfAppreciationsIndividualPage(empID);
      // this.selfAppreciations(empID);
    });
  }

  zoominimage(imageBase64) {
    const dialogRef = this.dialog.open(ImagezoompopupComponent, {
      width: '70%',
      data: { allimagedata: [imageBase64], indexvalue: 0 },
    });

  }

  selfAppreciationsIndividualPage(empID) {
    this.businesslogic.post('employee/getAppreciationsById', { 'employeeId': empID }).subscribe((response: any) => {
      this.myAppreciation = response;
    });
  }

  employeesiloview(empID) {
    this.router.navigate(['intranet/people/siloview', { 'data': empID }]);
  }


  gotoEmployee() {
    // tslint:disable-next-line:max-line-length
    // this.router.navigate(['intranet/people/employee', { 'search': this.search, 'WLID': this.worklocationID, 'sort': this.sortID}]);
    this.makeTotalDisplayScreenVisible = false;
    this.employeeObjectData.pageNo = 1;
    this.appreciationDetailsObject.pageNo = 1;
    this.listview = [];
    this.appreciationDetails = [];
    this.employeeID = '';
    // console.log(this.recentlyposteddata);
    this.employeeData();
    this.appreciationWall();
    this.selfAppreciations(this.businesslogic.employeeId);
  }

  gotoEmployeePage(empID) {
    this.router.navigate(['intranet/people/employee', { 'value': true, 'id': empID }]);
  }

  domainList() {
    this.businesslogic.get('employee/domainList').subscribe((response: any) => {
      this.domains = response;
    });
  }

  designationSelection(id) {
    this.businesslogic.post('employee/designationList', { domainId: id}).subscribe((response: any) => {
      this.domains_submenu = response;
    });
  }
}

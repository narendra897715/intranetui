import { Component, OnInit, ViewEncapsulation, Inject, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BusinessLogicService } from '../../business-logic.service';
import { IEmployeedynamicbinding } from '../../app.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { ConfirmDailogComponent } from '../../confirm-dailog/confirm-dailog.component';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Data } from '@angular/router/src/config';

@Component({
  selector: 'app-appreciation-popup',
  templateUrl: './appreciation-popup.component.html',
  styleUrls: ['./appreciation-popup.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // providers: [
  //   { provide: MAT_DIALOG_DATA, useValue: {} },
  //   { provide: MatDialogRef, useValue: {} }
  // ]
})
export class AppreciationPopupComponent implements OnInit {

  employeeSelected: any;
  mainPage: any;
  employeeSelection: any;
  names = [];
  projectnames = [];
  appreciation: any;
  form: FormGroup;
  rowcount = 0;
  employeeObjectData: IEmployeedynamicbinding = {
    search: null,
    workLocationId: null,
    sortById: 1,
    pageNo: 1,
    pageSize: 12,
    domainId: null
  };
  employee_names: Names[] = [];
  employeeSearch: any;
  myControl1 = new FormControl();
  filteredOptions1: Observable<Names[]>;
  autoCompleteCtrl: FormControl;
  filteredData: Names[];
  Employeeemail: any;
  employeeIndividualName: any;
  employeeMail: any;
  appreciationType: any;
  project_id: any;
  filteredProjectList: ProjectList[];
  listp = [{ 'team': 'one', 'id': 1 }, { 'team': 'two', 'id': 2 }];

  constructor(private businesslogic: BusinessLogicService, public dialog: MatDialog, private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AppreciationPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer, public nz: NgZone) { }

  ngOnInit() {
    console.log(this.data);
    this.mainPage = this.data.EMPID;
    this.employeeIndividualName = this.data.name;
    this.employeeMail = this.data.mailId;
    // this.employeeNames();
    // tslint:disable-next-line:max-line-length
    this.businesslogic.post('employee/getEmployeeDetailsDropDown', { 'employeeId': this.businesslogic.employeeId }).subscribe((response: Names[]) => {
      this.employee_names = response;
      //  this.names = response;
    });
    this.form = this.formBuilder.group({
      employeeSelection: [null],
      // tslint:disable-next-line:max-line-length
      appreciation_content: [null, [Validators.required, Validators.maxLength(5000), Validators.pattern(/[a-zA-Z0-9^]/),
      Validators.pattern(/\D[^0-9]/)]],
      employeeSelected: [null],
      appreciation_type: [null]
    });
  }

  onNoClick(): void {
    // tslint:disable-next-line:max-line-length
    // const dialogRef = this.dialog.open(ConfirmDailogComponent, { width: '30%', data : {warning: 'Are you sure you want to close pop-up?'}});

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result === true) {
    //     this.dialogRef.close(undefined);
    //   }
    // });
    this.dialogRef.close(undefined);
  }

  test(val) {
    this.autoCompleteCtrl = new FormControl();
    this.employeeSelected = '';
    this.project_id = '';
    if (val === '0') {
      this.autoCompleteCtrl.valueChanges.subscribe(keyWord => {
        this.businesslogic.post('employee/getEmployeeDetailsDropDown', {
          'employeeId': this.businesslogic.employeeId,
          'searchData': keyWord
        }).subscribe((response: Names[]) => { this.filteredData = response; this.names = response; });
        for (let i = 0; i < this.names.length; i++) {
          if (keyWord === this.names[i].employeeName) {
            this.employeeSelected = this.names[i].employeeId;
            this.Employeeemail = this.names[i].email;
          }
        }
      });
    }
    if (val === '1') {
      this.autoCompleteCtrl.valueChanges.subscribe(keyWord => {
        this.businesslogic.post('employee/projectsList', { 'searchData': keyWord }).subscribe((response: ProjectList[]) => {
          this.filteredProjectList = response; this.projectnames = response;
        });
        for (let i = 0; i < this.projectnames.length; i++) {
          if (keyWord === this.projectnames[i].name) {
            this.project_id = this.projectnames[i].staticProjectsID;
          }
        }
      });
    }
  }

  sendAppreciation() {
    if (this.form.value.appreciation_type === '0' || this.mainPage !== '') {
      this.appreciation = {
        'appreciatedBy': this.businesslogic.employeeId,
        'appreciationTo': this.employeeSelected ? this.employeeSelected : this.data.EMPID,
        'contentOfAppreciation': this.form.value.appreciation_content,
        'createdBy': this.businesslogic.employeeId,
        'updatedBy': this.businesslogic.employeeId,
        'employeeName': this.employeeSearch ? this.employeeSearch : this.employeeIndividualName,
        'email': this.Employeeemail ? this.Employeeemail : this.employeeMail,
        'projectID': null
      };
      this.businesslogic.post('employee/sendAppreciations', this.appreciation).subscribe((response: any) => {
      });
      this.dialogRef.close(this.appreciation.contentOfAppreciation);
    }
    if (this.form.value.appreciation_type === '1') {
      this.appreciation = {
        'appreciatedBy': this.businesslogic.employeeId,
        'appreciationTo': null,
        'contentOfAppreciation': this.form.value.appreciation_content,
        'createdBy': this.businesslogic.employeeId,
        'updatedBy': this.businesslogic.employeeId,
        'employeeName': null,
        'email': null,
        'projectId': this.project_id
      };
      this.businesslogic.post('employee/sendAppreciations', this.appreciation).subscribe((response: any) => {
      });
      this.dialogRef.close(this.appreciation.contentOfAppreciation);
    }
    // else {
    //   this.appreciation = {
    //     'appreciatedBy': this.businesslogic.employeeId,
    //     'appreciationTo': this.employeeSelected ? this.employeeSelected : this.data.EMPID,
    //     'contentOfAppreciation': this.form.value.appreciation_content,
    //     'createdBy': this.businesslogic.employeeId,
    //     'updatedBy': this.businesslogic.employeeId,
    //     'employeeName': this.employeeSearch ? this.employeeSearch : this.employeeIndividualName,
    //     'email': this.Employeeemail ? this.Employeeemail : this.employeeMail,
    //     'projectID': null
    //   };
    //   this.businesslogic.post('employee/sendAppreciations', this.appreciation).subscribe((response: any) => {
    //   });
    //   this.dialogRef.close(this.appreciation.contentOfAppreciation);
    // }
  }
}


export interface User {
  name: string;
  id: number;
}

export interface Names {
  employeeId: number;
  employeeName: string;
  gender: string;
  dateOfJoining: Date;
}

export interface ProjectList {

  description: string;
  endDate: Date;
  name: string;
  projectType: string;
  startDate: Date;
  staticProjectsID: number;
  status: boolean;
}

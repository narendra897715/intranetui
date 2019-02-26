import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

import { BusinessLogicService } from '../../business-logic.service';
@Component({
  selector: 'app-edit-dailog-for-pollingevent',
  templateUrl: './edit-dailog-for-pollingevent.component.html',
  styleUrls: ['./edit-dailog-for-pollingevent.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditDailogForPollingeventComponent implements OnInit {
  form: FormGroup;
  editpollingData: any;
  submenu: any;
  constructor( public dialogRef: MatDialogRef<EditDailogForPollingeventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private businesslogic: BusinessLogicService,
    private formBuilder: FormBuilder) {
      this.submenu = [{categoryId: 7, categoryName: 'Polling'}];
      this.editpollingData = this.data.pollingOptions;
     }

  ngOnInit() {
    this.form = this.formBuilder.group({
      categoryId: [this.data.categoryId ? this.data.categoryId : null, Validators.required],
      eventStartDate: [this.data.eventStartDate ? this.data.eventStartDate : null, Validators.required],
      eventEndDate: [this.data.eventEndDate ? this.data.eventEndDate : null, Validators.required],
      eventName: [this.data.eventName ? this.data.eventName : null, [Validators.required, Validators.maxLength(150), Validators.pattern(/[a-zA-Z0-9^]/), Validators.pattern(/\D[a-zA-Z0-9^]/)]],
      updatedBy: [this.businesslogic.employeeId ],
      createdBy: [this.data.createdBy ],
      imageData: [[]],
      categoryName: [this.data.categoryName ? this.data.categoryName : null],
      colourCode: [this.data.colourCode ? this.data.colourCode : null],
      createdByName: [this.data.createdByName ? this.data.createdByName : null],
      createdDate: [this.data.createdDate ? this.data.createdDate : null],
      enteredTheDiscussion: [this.data.enteredTheDiscussion ? this.data.enteredTheDiscussion : null],
      newsAndUpdatesId: [this.data.newsAndUpdatesId ? this.data.newsAndUpdatesId : null],
      updatedByName: [this.data.updatedByName ? this.data.updatedByName : null],
      updatedDate: [this.data.updatedDate ? this.data.updatedDate : null],
      interactionForumsId : [this.data.interactionForumsId ? this.data.interactionForumsId : null],
      CLDData : [this.data.CLDData ? this.data.CLDData : []],
      eventDescription : [this.data.eventDescription ? this.data.eventDescription : null],
      email : [this.data.email ? this.data.email : null],
      skype : [this.data.skype ? this.data.skype : null],
      mail : [this.data.mail ? this.data.mail : null]

    });
  }

  UpdatePolling() {
     this.form.value.pollingData = this.editpollingData;
    this.form.value.eventStartDate = Date.parse(this.form.value.eventStartDate);
    this.form.value.eventEndDate = Date.parse(this.form.value.eventEndDate);
    this.businesslogic.postUpdate('news&updates/postAnUpdate', this.form.value).subscribe((response: any) => {
      this.dialogRef.close(this.form.value.newsAndUpdatesId);
    });
   // this.dialogRef.close(this.form.value.newsAndUpdatesId);
  }

  onNoClick(): void {
    this.dialogRef.close(undefined);
  }

  deleteoption(option) {
     this.businesslogic.post('interaction_forums/deleteOption', {optionId : option.optionId}).subscribe((response: any) => {
      const index = this.editpollingData.indexOf(option);
      if (index >= 0) {
       // this.optionnumber = this.optionnumber-1;
        this.editpollingData.splice(index, 1);
      }
     });
  }
}

import { Component, OnInit, Inject, ViewEncapsulation, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatInput } from '@angular/material';
import { Itab } from '../app.interface';
import { BusinessLogicService } from '../business-logic.service';
import { IPostupdateobject, ImageProperties } from '../app.interface';
import { MatSnackBar } from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {DatePickerDirective} from 'ng2-date-picker';
import {ImageUploadService} from './../imageUpload.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { ConfirmDailogComponent } from '../confirm-dailog/confirm-dailog.component';
import { ElementRef } from '@angular/core/src/linker/element_ref';
@Component({
  selector: 'app-editpopupmodal',
  templateUrl: './editpopupmodal.component.html',
  styleUrls: ['./editpopupmodal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditpopupmodalComponent implements OnInit {
  @ViewChild('ETdateDirectivePicker') ETdatePickerDirective: DatePickerDirective;
  @ViewChild('STdateDirectivePicker') STdatePickerDirective: DatePickerDirective;

  onEdit = new EventEmitter();
  submenu: Itab[];
  public submenu_dasboard: Itab[];
  form: FormGroup;
  removable = true;
  onAdd = new EventEmitter();
  pictureBase: string;
  data_source: Itab[] = [];
  post_edit: boolean;
  categoryIdSelected;
  emptyImageData = [];
  imageobject: ImageProperties[] = [];
  imageOption: any;
  ceodeskOption: any;
  starttimeupdate: string;
  endtimeupdate: string;
  StimeSDhours: any;
  EtimeSDhours: any;
  StimeSDminutes: any;
  EtimeSDminutes: any;
  SDhours: any;
  SDminutes: any;
  EDhours: any;
  EDminutes: any;
  // selectedDate = new Date();
  STdatePickerConfig = {
    format : 'hh:mm a',
  };

  ETdatePickerConfig = {
    format : 'hh:mm a',

  };

  configNU: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    translate: 'no',
  };

  constructor(
    public dialogRef: MatDialogRef<EditpopupmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private businesslogic: BusinessLogicService,
    private formBuilder: FormBuilder, public snackBar: MatSnackBar, public dialog: MatDialog, 
    public imageuploadservice: ImageUploadService) { }
    openET() {
       this.ETdatePickerDirective.api.open();
       }
     openST() {
      this.STdatePickerDirective.api.open();
     }
  ngOnInit() {

    console.log(this.data.editingdata);
   // this.ceodeskOption = this.data.editingdata;
    this.imageOption = this.data.editingdata;
    this.ceodeskOption = this.data.from;
    console.log(this.ceodeskOption);
    if (this.data.from === 'news&update' || this.data.from === 'ceodesk') {
      this.businesslogic.post('news&updates/getCategoryList', { employeeId: this.businesslogic.employeeId }).subscribe((response: any) => {
        this.submenu_dasboard = response;
        if (this.data.from === 'ceodesk') {
          this.categoryIdSelected = this.submenu_dasboard[3].categoryId ? this.submenu_dasboard[3].categoryId : '';
        }
      });
    } else {
      this.businesslogic.get('interaction_forums/getCategoryDropDownSelection').subscribe((response: any) => {
        this.submenu_dasboard = response;
      });
    }
    if (this.data.editingdata === 1 || this.data.editingdata === 2) {
      this.post_edit = true;
      this.form = this.formBuilder.group({
        categoryId: [null, Validators.required],
        eventStartDate: [null, Validators.required],
        eventEndDate: [null],
        eventEndTime: [null],
        eventStartTime: [null],

        // tslint:disable-next-line:max-line-length
        eventName: [null, [Validators.required, Validators.maxLength(150), Validators.pattern(/[a-zA-Z0-9^]/), Validators.pattern(/\D[^0-9]/)]],
        // tslint:disable-next-line:max-line-length
        eventDescription: [null, [Validators.required, Validators.pattern(/[a-zA-Z0-9^]/), Validators.pattern(/\D[^0-9]/)]],
        updatedBy: [this.businesslogic.employeeId],
        createdBy: [this.businesslogic.employeeId],
        imageData: [[]]
      });
    } else if (this.data.editingdata !== 1 && this.data.editingdata !== 2) {
      this.post_edit = false;
      if (this.data.editingdata.eventStartDate != null) {
        if (this.data.editingdata.eventStartDate.getHours() > 12 && this.data.editingdata.eventStartDate.getMinutes() >= 0) {
          this.SDhours = this.data.editingdata.eventStartDate.getHours() - 12;
          this.SDminutes = this.data.editingdata.eventStartDate.getMinutes();
          this.SDhours = (this.SDhours < 10) ? '0' + this.SDhours : this.SDhours;
          this.SDminutes = (this.SDminutes < 10) ? '0' + this.SDminutes : this.SDminutes;
          this.starttimeupdate =  this.SDhours + ':'  + this.SDminutes + ' ' + 'pm';



         } else if (this.data.editingdata.eventStartDate.getHours() === 0 && this.data.editingdata.eventStartDate.getMinutes() >= 1) {
          this.SDhours = this.data.editingdata.eventStartDate.getHours() + 12;
          this.SDminutes = this.data.editingdata.eventStartDate.getMinutes();
          this.SDhours = (this.SDhours < 10) ? '0' + this.SDhours : this.SDhours;
          this.SDminutes = (this.SDminutes < 10) ? '0' + this.SDminutes : this.SDminutes;
          this.starttimeupdate =  this.SDhours + ':'  + this.SDminutes + ' ' + 'am';

        } else if (this.data.editingdata.eventStartDate.getHours() === 0 && this.data.editingdata.eventStartDate.getMinutes() === 0) {
          this.starttimeupdate = 12 + ':'  + '00' + ' ' + 'am';
        } else if (this.data.editingdata.eventStartDate.getHours() === 12 && this.data.editingdata.eventStartDate.getMinutes() >= 0) {
          this.SDhours = this.data.editingdata.eventStartDate.getHours();
          this.SDminutes = this.data.editingdata.eventStartDate.getMinutes();
          this.SDhours = (this.SDhours < 10) ? '0' + this.SDhours : this.SDhours;
          this.SDminutes = (this.SDminutes < 10) ? '0' + this.SDminutes : this.SDminutes;
          this.starttimeupdate =  this.SDhours + ':'  + this.SDminutes + ' ' + 'pm';
        } else {
          this.SDhours = this.data.editingdata.eventStartDate.getHours() ;
          this.SDminutes = this.data.editingdata.eventStartDate.getMinutes();
          this.SDhours = (this.SDhours < 10) ? '0' + this.SDhours : this.SDhours;
          this.SDminutes = (this.SDminutes < 10) ? '0' + this.SDminutes : this.SDminutes;
          this.starttimeupdate =  this.SDhours + ':'  + this.SDminutes + ' ' + 'am';
        }
      }


      if (this.data.editingdata.eventEndDate != null) {
        if (this.data.editingdata.eventEndDate.getHours() > 12 && this.data.editingdata.eventEndDate.getMinutes() >= 0) {
          this.EDhours = this.data.editingdata.eventEndDate.getHours() - 12;
          this.EDminutes = this.data.editingdata.eventEndDate.getMinutes();
          this.EDhours = (this.EDhours < 10) ? '0' + this.EDhours : this.EDhours;
          this.EDminutes = (this.EDminutes < 10) ? '0' + this.EDminutes : this.EDminutes;
          this.endtimeupdate =  this.EDhours + ':'  + this.EDminutes + ' ' + 'pm';

        } else if (this.data.editingdata.eventEndDate.getHours() === 0 && this.data.editingdata.eventEndDate.getMinutes() >= 1) {
          this.EDhours = this.data.editingdata.eventEndDate.getHours() + 12;
          this.EDminutes = this.data.editingdata.eventEndDate.getMinutes();
          this.EDhours = (this.EDhours < 10) ? '0' + this.EDhours : this.EDhours;
          this.EDminutes = (this.EDminutes < 10) ? '0' + this.EDminutes : this.EDminutes;
          this.endtimeupdate =  this.EDhours + ':'  + this.EDminutes + ' ' + 'am';

        } else if (this.data.editingdata.eventEndDate.getHours() === 0 && this.data.editingdata.eventEndDate.getMinutes() === 0) {
          this.endtimeupdate = null;
        } else if (this.data.editingdata.eventEndDate.getHours() === 12 && this.data.editingdata.eventEndDate.getMinutes() >= 0) {
          this.EDhours = this.data.editingdata.eventEndDate.getHours();
          this.EDminutes = this.data.editingdata.eventEndDate.getMinutes();
          this.EDhours = (this.EDhours < 10) ? '0' + this.EDhours : this.EDhours;
          this.EDminutes = (this.EDminutes < 10) ? '0' + this.EDminutes : this.EDminutes;
          this.endtimeupdate =  this.EDhours + ':'  + this.EDminutes + ' ' + 'pm';
        } else {
          this.EDhours = this.data.editingdata.eventEndDate.getHours();
          this.EDminutes = this.data.editingdata.eventEndDate.getMinutes();
          this.EDhours = (this.EDhours < 10) ? '0' + this.EDhours : this.EDhours;
          this.EDminutes = (this.EDminutes < 10) ? '0' + this.EDminutes : this.EDminutes;
          this.endtimeupdate =  this.EDhours + ':'  + this.EDminutes + ' ' + 'am';
        }
      }


      // if(this.data.editingdata.eventEndDate.getHours() > 12 && this.data.editingdata.eventEndDate.getMinutes() >= 1){
      // tslint:disable-next-line:max-line-length
      //   this.endtimeupdate  = this.data.editingdata.eventEndDate.getHours()-12 + ':' + this.data.editingdata.eventEndDate.getMinutes() + ' ' + 'pm';

      // }
      // else{
      // tslint:disable-next-line:max-line-length
      //   this.endtimeupdate  = this.data.editingdata.eventEndDate.getHours() + ':' + this.data.editingdata.eventEndDate.getMinutes() + ' ' + 'am';

      // }

      this.form = this.formBuilder.group({
        categoryId: [this.data.editingdata.categoryId ? this.data.editingdata.categoryId : null, Validators.required],
        eventStartDate: [this.data.editingdata.eventStartDate ? this.data.editingdata.eventStartDate : null, Validators.required],
        eventEndDate: [this.data.editingdata.eventEndDate ? this.data.editingdata.eventEndDate : null],
        eventStartTime: [this.starttimeupdate],
        eventEndTime: [this.endtimeupdate],
        // tslint:disable-next-line:max-line-length
        eventName: [this.data.editingdata.eventName ? this.data.editingdata.eventName : null, [Validators.required, Validators.maxLength(150), Validators.pattern(/[a-zA-Z0-9^]/), Validators.pattern(/\D[^0-9]/)]],
        // tslint:disable-next-line:max-line-length
        eventDescription: [this.data.editingdata.eventDescription ? this.data.editingdata.eventDescription : null, [ Validators.pattern(/[a-zA-Z0-9^]/), Validators.pattern(/\D[^0-9]/)]],
        updatedBy: [this.businesslogic.employeeId],
        createdBy: [this.data.editingdata.createdBy],
        interactionForumsId: [this.data.editingdata.interactionForumsId ? this.data.editingdata.interactionForumsId : null],
        categoryName: [this.data.editingdata.categoryName ? this.data.editingdata.categoryName : null],
        colourCode: [this.data.editingdata.colourCode ? this.data.editingdata.colourCode : null],
        createdByName: [this.data.editingdata.createdByName ? this.data.editingdata.createdByName : null],
        createdDate: [this.data.editingdata.createdDate ? this.data.editingdata.createdDate : null],
        enteredTheDiscussion: [this.data.editingdata.enteredTheDiscussion ? this.data.editingdata.enteredTheDiscussion : null],
        newsAndUpdatesId: [this.data.editingdata.newsAndUpdatesId ? this.data.editingdata.newsAndUpdatesId : null],
        updatedByName: [this.data.editingdata.updatedByName ? this.data.editingdata.updatedByName : null],
        updatedDate: [this.data.editingdata.updatedDate ? this.data.editingdata.updatedDate : null]
      });
      if (this.data.editingdata.newsAndUpdatesId != null) {
        const phoneControl = this.form.get('eventDescription');
        phoneControl.setValidators([Validators.required]);
      }
    }
    // if (this.data.editingdata === 2) {
    //   this.form.value.categoryId = 9;
    // }
  }

  postUpdate() {
    this.form.value.imageData = this.imageobject;
    const SD = this.form.value.eventStartDate;
    // let Stime = this.form.value.eventStartTime;
    if (this.form.value.eventStartTime != null) {
      if (this.form.value.eventStartTime.slice(6) === 'pm') {
        if (Number(this.form.value.eventStartTime.slice(0, 2)) === 12) {
          this.StimeSDhours = Number(this.form.value.eventStartTime.slice(0, 2));
        } else {
          this.StimeSDhours = Number(this.form.value.eventStartTime.slice(0, 2)) + 12;
        }
        this.StimeSDminutes = Number(this.form.value.eventStartTime.slice(3, 5));
      } else {
        if (Number(this.form.value.eventStartTime.slice(0, 2)) === 12 && Number(this.form.value.eventStartTime.slice(3, 5)) >= 0 ) {
          this.StimeSDhours = 0;
        } else {
          this.StimeSDhours = Number(this.form.value.eventStartTime.slice(0, 2));
        }
        this.StimeSDminutes = Number(this.form.value.eventStartTime.slice(3, 5));
      }

    }

    if (this.form.value.eventEndTime != null) {
      if (this.form.value.eventEndTime.slice(6) === 'pm') {
        if (Number(this.form.value.eventEndTime.slice(0, 2)) === 12) {
          this.EtimeSDhours = Number(this.form.value.eventEndTime.slice(0, 2));
        } else {
          this.EtimeSDhours = Number(this.form.value.eventEndTime.slice(0, 2)) + 12;
        }
        this.EtimeSDminutes = Number(this.form.value.eventEndTime.slice(3, 5));
      } else {
        if (Number(this.form.value.eventEndTime.slice(0, 2)) === 12 && Number(this.form.value.eventEndTime.slice(3, 5)) >= 0 ) {
          this.EtimeSDhours = 0;
        } else {
          this.EtimeSDhours = Number(this.form.value.eventEndTime.slice(0, 2));
        }
        this.EtimeSDminutes = Number(this.form.value.eventEndTime.slice(3, 5));
      }

    }

    const ED = this.form.value.eventEndDate;
    // const Etime = this.form.value.eventEndTime;
    if (this.form.value.eventStartDate != null) {
      if (this.form.value.eventStartTime != null && this.form.value.eventStartTime !== '') {
        const Stotaldate = new Date(SD.getFullYear(), SD.getMonth(),
          SD.getDate(), this.StimeSDhours, this.StimeSDminutes
        );
        this.form.value.eventStartDate = Stotaldate.getTime();
      } else {
        const Stotaldate = new Date(SD.getFullYear(), SD.getMonth(),
        SD.getDate(), 0, 0
      );
        this.form.value.eventStartDate = Stotaldate.getTime();
      }


    }
    if (this.form.value.eventEndDate != null) {
      if (this.form.value.eventEndTime != null && this.form.value.eventEndTime !== '') {
        const Etotaldate = new Date(ED.getFullYear(), ED.getMonth(),
          ED.getDate(), this.EtimeSDhours, this.EtimeSDminutes
        );
        this.form.value.eventEndDate = Etotaldate.getTime();
      } else {
        const Etotaldate = new Date(ED.getFullYear(), ED.getMonth(),
        ED.getDate(), 23, 59
      );
        this.form.value.eventEndDate = Etotaldate.getTime();
      }


    }
   if (this.form.value.eventEndDate != null) {
     if (this.form.value.eventEndTime != null) {
      if (this.form.value.eventStartDate >= this.form.value.eventEndDate) {
        this.snackBar.open('End time cannot be prior to start time', '', { duration: 3000, panelClass: ['warningMessage'] });
      } else {
        if (this.data.from === 'news&update' || this.data.from === 'ceodesk') {
          console.log('called');
          this.businesslogic.postUpdate('news&updates/postAnUpdate', this.form.value).subscribe((response: any) => {
            this.dialogRef.close('posted succesfully');
          });
        } else {
          this.businesslogic.postUpdate('interaction_forums/postAnDiscussion', this.form.value).subscribe((response: any) => {
            this.dialogRef.close('posted succesfully');
          });
        }
      }
     } else {
      if (this.data.from === 'news&update' || this.data.from === 'ceodesk') {
        console.log('called');
        this.businesslogic.postUpdate('news&updates/postAnUpdate', this.form.value).subscribe((response: any) => {
          this.dialogRef.close('posted succesfully');
        });
      } else {
        this.businesslogic.postUpdate('interaction_forums/postAnDiscussion', this.form.value).subscribe((response: any) => {
          this.dialogRef.close('posted succesfully');
        });
      }
     }
   } else {
    if (this.data.from === 'news&update' || this.data.from === 'ceodesk') {
      console.log('called');
      this.businesslogic.postUpdate('news&updates/postAnUpdate', this.form.value).subscribe((response: any) => {
        this.dialogRef.close('posted succesfully');
      });
    } else {
      this.businesslogic.postUpdate('interaction_forums/postAnDiscussion', this.form.value).subscribe((response: any) => {
        this.dialogRef.close('posted succesfully');
      });
    }
   }

  }

  // private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 12 };
  onNoClick(): void {
    // tslint:disable-next-line:max-line-length
    const dialogRef = this.dialog.open(ConfirmDailogComponent, { width: '30%', data : {warning: 'Are you sure you want to exit from this screen ?'}});

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.dialogRef.close(undefined);
      }
    });
    // this.dialogRef.close(undefined);
  }

  openInput() {
    // your can use ElementRef for this later
    document.getElementById('upload').click();
  }

  onFileChange(evt) {
    this.imageuploadservice.imageupload(evt, this.emptyImageData).then((result: any) => {
      this.imageobject = result;
      this.form.value.imageData = this.imageobject;
      }, (error) => {
         console.log(error);
      });

  }
 removeImageBeforePost(image): void {
    this.form.value.imageData = this.imageuploadservice.removeimage(image, this.imageobject);
  }

}

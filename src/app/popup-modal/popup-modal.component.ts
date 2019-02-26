import { Component, OnInit, ViewEncapsulation, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatChipInputEvent } from '@angular/material';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { Itab } from '../app.interface';

// import {postupdateobject} from './../app.interface';
import { ImageProperties } from '../app.interface';
import { BusinessLogicService } from '../business-logic.service';
@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopupModalComponent implements OnInit {
  removable = true;
  onAdd = new EventEmitter();
  pictureBase: string;
  data_source: Itab[] = [];

  file: any;
  form: FormGroup;
  imageobject: ImageProperties[] = [];
  count = 0;
  sizeexceedsfilename: string = null;
  onlyimagewarning: string = null;
  uploadimage = 'assets/images/upload.svg';

  constructor(public dialogRef: MatDialogRef<PopupModalComponent>
    , private formBuilder: FormBuilder
    , private dialog: MatDialog
    , private businesslogic: BusinessLogicService) {
    this.businesslogic.get('news&updates/getCategoryList').subscribe((response: any) => {
      this.data_source = response;

    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      categoryId: [null, Validators.required],
      eventStartDate: [null, Validators.required],
      eventEndDate: [null, Validators.required],
      eventName: [null, Validators.required],
      eventDescription: [null, Validators.required],
      updatedBy: [this.businesslogic.employeeId],
      createdBy: [this.businesslogic.employeeId],
      imageData: [[]]
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  openInput() {
    // your can use ElementRef for this later
    document.getElementById('upload').click();
  }

  onFileChange(evt) {
    this.count = 0;
    this.imageobject = [];
    const files = evt.target.files;
    if (files.length > 5) {
      this.onlyimagewarning = 'Files Selection Limit Exceeds';
    } else {
      for (let i = 0; i < files.length; i++) {
        if (files[i].type.indexOf('image') === -1) {
          this.onlyimagewarning = 'Accepts images only';
          this.count = 1;
          break;
        } else if (files[i].size > 1000000) {
          this.count = 1;
          this.onlyimagewarning = null;
          this.sizeexceedsfilename = files[i].name;
          break;
        }

      }
      if (this.count === 0) {
        this.onlyimagewarning = null;
        this.sizeexceedsfilename = null;
        if (files) {
          for (let i = 0; i < files.length; i++) {
            this.file = files[i];
            const reader = new FileReader();
            reader.onload = this._handleReaderLoaded.bind(this, files.length, i, files[i]);
            reader.readAsBinaryString(this.file);
          }
        }
      }
    }
  }

  _handleReaderLoaded(lengthoffiles, ivalue, filevalue, readerEvt) {

    const binaryString = readerEvt.target.result;
    this.imageobject.push({
      'imageName': filevalue.name, 'imageType': filevalue.type, 'Image': btoa(binaryString),
      'updatedBy': this.businesslogic.employeeId, 'createdBy': this.businesslogic.employeeId
    });
    if (ivalue + 1 === lengthoffiles) {
      this.addimage();
    }
  }

  addimage() {
    this.form.value.imageData = this.imageobject;
  }


  postUpdate() {
    //   console.log(this.form.value);
    this.form.value.eventStartDate = Date.parse(this.form.value.eventStartDate);
    this.form.value.eventEndDate = Date.parse(this.form.value.eventEndDate);
    this.businesslogic.postUpdate('news&updates/postAnUpdate', this.form.value).subscribe((response: any) => {

      this.onAdd.emit('test');
    });

    this.dialogRef.close();
  }

  remove(image): void {
    const index = this.imageobject.indexOf(image);
    if (index >= 0) {
      this.imageobject.splice(index, 1);
      this.form.value.imageData = this.imageobject;
    }
  }


}


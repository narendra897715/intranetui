import { Component, OnInit, EventEmitter, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BusinessLogicService } from '../../../business-logic.service';
import { FileProperties, Inotification } from '../../../app.interface';
import { MatSnackBar } from '@angular/material';
import {ConfirmDailogComponent} from '../../../confirm-dailog/confirm-dailog.component';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-upload-popup',
  templateUrl: './upload-popup.component.html',
  styleUrls: ['./upload-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadPopupComponent implements OnInit {
  fileToUpload: File = null;
  fileBase: any;
  fileobject: FileProperties[] = [];
  file: any;
  fileCategory: any;
  sortBy: any;
  fileData = [[]];
  ResourceSubMenu: any;
  removable = true;
  onAdd = new EventEmitter();
  form: FormGroup;
  count = 0;
  FileName: any;
  uploaded_filename: any;
  categorySelection: number;
   sizeexceedsfilename: string = null;
   onlyimagewarning: string = null;
  constructor(private businesslogic: BusinessLogicService, public dialog: MatDialog,
    public dialogRef: MatDialogRef<UploadPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: Inotification= {name: null},
    private formBuilder: FormBuilder, public snackBar: MatSnackBar ) {
      if (data.name === 'resources/getResourcesPolicies') {
           this.categorySelection = 1;
      } else if (data.name === 'resources/getResourcesForms') {
        this.categorySelection = 2;
      } else {
        this.categorySelection = 3;
      }
     }

  ngOnInit() {
  //  this.selected = 1;
  this.businesslogic.get('resources/getResourcesCategory ').subscribe((response) => {
    this.ResourceSubMenu = response;
  });
    this.form = this.formBuilder.group({
      fileCategory: [ 1, Validators.required],
      fileData: [null, Validators.required],
      FileName: [null, Validators.required]
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

  changeListner(event) {
    console.log('event', event);
    const reader = new FileReader();
    reader.onload = (e: any) => { this.fileBase = e.target.result; };
    reader.readAsDataURL(event.target.files[0]);
  }

  openInput() {
    // your can use ElementRef for this later
    document.getElementById('upload').click();
  }

  onFileChange(evt) {
    this.count = 0;
    this.fileobject = [];
    const files = evt.target.files;
    if (files.length + this.fileobject.length  > 1) {
      this.snackBar.open('max of 5 images can be uploaded', '', { duration: 3000, panelClass: ['warningMessage']  });
    } else {
  for (let i = 0; i < files.length; i++) {
    if (files[i].type.indexOf('pdf') !== 12 && files[i].type.indexOf('word') !== 46) {
      this.snackBar.open('Accepts only word and pdf files', '', { duration: 3000, panelClass: ['warningMessage']  });
      this.count = 1;
      break;
    } else if (files[i].size > 1000000) {
      this.count = 1;
      this.onlyimagewarning = null;
      this.snackBar.open(files[i].name + ' ' + 'exceeds size limit', '', { duration: 3000, panelClass: ['warningMessage'] });
         break;
    }
}
if (this.count === 0) {
  this.uploaded_filename = files[0].name;
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
    this.fileobject.push({
      'fileName': filevalue.name, 'fileType': filevalue.type, 'files': btoa(binaryString),
      'updatedBy':  this.businesslogic.employeeId,
      'createdBy':  this.businesslogic.employeeId, 'resourcesCategoryId': this.categorySelection
    });
    if (ivalue + 1 === lengthoffiles) {
      this.addfile();
    }
    // if (ivalue + 1 === lengthoffiles) {
    //   this.addimage();
    // }
  }

  addfile() {
    console.log(this.fileobject);

  }

  remove(image): void {
    const index = this.fileobject.indexOf(image);

    if (index >= 0) {
      this.fileobject.splice(index, 1);
    }
  }

  sendFile() {
    // tslint:disable-next-line:max-line-length
    console.log(this.form.value.FileName);
    this.fileobject[0].fileName = this.form.value.FileName;
    this.businesslogic.post('resources/uploadFile', this.fileobject).subscribe((response: any) => {
      this.dialogRef.close({selectedcategoryyid : this.categorySelection, responsefromservice: response});
    });
  }

}

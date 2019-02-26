import { Component, OnInit, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { ImageProperties, IinteractionForumDailog, IinteractionForumEvent } from '../../app.interface';
import { Itab } from '../../app.interface';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BusinessLogicService } from '../../business-logic.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ConfirmDailogComponent } from '../../confirm-dailog/confirm-dailog.component';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DatePickerDirective } from 'ng2-date-picker';
import {ImageUploadService} from './../../imageUpload.service';
@Component({
  selector: 'app-interaction-forums-dailog',
  templateUrl: './interaction-forums-dailog.component.html',
  styleUrls: ['./interaction-forums-dailog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InteractionForumsDailogComponent implements OnInit {
  @ViewChild('ETdateDirectivePicker') ETdatePickerDirective: DatePickerDirective;
  @ViewChild('STdateDirectivePicker') STdatePickerDirective: DatePickerDirective;
  removable = true;
  data_source: Itab[] = [];
  Options2 = [];
  interactionforumdailogobject: IinteractionForumDailog = {
    categoryId: null,
    eventDescription: null,
    eventName: null,
    eventEndDate: null,
    createdBy: this.businesslogic.employeeId,
    updatedBy: this.businesslogic.employeeId,
    eventStartDate: null, imageData: [], pollingOptions: null
  };
  imageobject: ImageProperties[] = [];
  optionDescription = null;
  hideUpdateButton = false;
  showimageupload: boolean;
  disableCommentButton = true;
  emptyImageData = [];
  sendResponseAfterpopclose = null;

  optionNumber = 0;
  disableOptionButton = true;
  Stimehours: any;
  Etimehours: any;
  Stimeminutes: any;
  Etimeminutes: any;
  eventStartTime: any;
  eventEndTime: any;
  SDhours: any;
  SDminutes: any;
  EDhours: any;
  EDminutes: any;
  option = {
    optionnumber: 1,
    optionDescription: null,
    createdBy: this.businesslogic.employeeId,
    updatedBy: this.businesslogic.employeeId
  };
  editingId: number;
  constructor(
    public dialogRef: MatDialogRef<InteractionForumsDailogComponent>,
    private businesslogic: BusinessLogicService, @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar, public dialog: MatDialog, public imageuploadservice: ImageUploadService
  ) {
    if (data.for === 'edit') {
      this.showimageupload = false;
      this.data_source = [{categoryId: 7, categoryName: 'Polling', typeId: null, catergoryURL: null}];
      this.interactionforumdailogobject = Object.assign({}, data.editingdata);
      if (this.interactionforumdailogobject.eventStartDate != null) {
        if (this.interactionforumdailogobject.eventStartDate.getHours() > 12 &&
            this.interactionforumdailogobject.eventStartDate.getMinutes() >= 0) {
          this.SDhours = this.interactionforumdailogobject.eventStartDate.getHours() - 12;
          this.SDminutes = this.interactionforumdailogobject.eventStartDate.getMinutes();
          this.SDhours = (this.SDhours < 10) ? '0' + this.SDhours : this.SDhours;
          this.SDminutes = (this.SDminutes < 10) ? '0' + this.SDminutes : this.SDminutes;
          this.eventStartTime =  this.SDhours + ':'  + this.SDminutes + ' ' + 'pm';
         } else if (this.interactionforumdailogobject.eventStartDate.getHours() === 0 &&
                  this.interactionforumdailogobject.eventStartDate.getMinutes() >= 1) {
          this.SDhours = this.interactionforumdailogobject.eventStartDate.getHours() + 12;
          this.SDminutes = this.interactionforumdailogobject.eventStartDate.getMinutes();
          this.SDhours = (this.SDhours < 10) ? '0' + this.SDhours : this.SDhours;
          this.SDminutes = (this.SDminutes < 10) ? '0' + this.SDminutes : this.SDminutes;
          this.eventStartTime =  this.SDhours + ':'  + this.SDminutes + ' ' + 'am';
        } else if (this.interactionforumdailogobject.eventStartDate.getHours() === 0 &&
                   this.interactionforumdailogobject.eventStartDate.getMinutes() === 0) {
          this.eventStartTime = 12 + ':'  + '00' + ' ' + 'am';
        } else if (this.interactionforumdailogobject.eventStartDate.getHours() === 12 &&
                 this.interactionforumdailogobject.eventStartDate.getMinutes() >= 0) {
          this.SDhours = this.interactionforumdailogobject.eventStartDate.getHours();
          this.SDminutes = this.interactionforumdailogobject.eventStartDate.getMinutes();
          this.SDhours = (this.SDhours < 10) ? '0' + this.SDhours : this.SDhours;
          this.SDminutes = (this.SDminutes < 10) ? '0' + this.SDminutes : this.SDminutes;
          this.eventStartTime =  this.SDhours + ':'  + this.SDminutes + ' ' + 'pm';
        } else {
          this.SDhours = this.interactionforumdailogobject.eventStartDate.getHours() ;
          this.SDminutes = this.interactionforumdailogobject.eventStartDate.getMinutes();
          this.SDhours = (this.SDhours < 10) ? '0' + this.SDhours : this.SDhours;
          this.SDminutes = (this.SDminutes < 10) ? '0' + this.SDminutes : this.SDminutes;
          this.eventStartTime =  this.SDhours + ':'  + this.SDminutes + ' ' + 'am';
        }
      }
      if (this.interactionforumdailogobject.eventEndDate != null) {
        if (this.interactionforumdailogobject.eventEndDate.getHours() > 12 &&
            this.interactionforumdailogobject.eventEndDate.getMinutes() >= 0) {
          this.EDhours = this.interactionforumdailogobject.eventEndDate.getHours() - 12;
          this.EDminutes = this.interactionforumdailogobject.eventEndDate.getMinutes();
          this.EDhours = (this.EDhours < 10) ? '0' + this.EDhours : this.EDhours;
          this.EDminutes = (this.EDminutes < 10) ? '0' + this.EDminutes : this.EDminutes;
          this.eventEndTime =  this.EDhours + ':'  + this.EDminutes + ' ' + 'pm';
        } else if (this.interactionforumdailogobject.eventEndDate.getHours() === 0 &&
                   this.interactionforumdailogobject.eventEndDate.getMinutes() >= 1) {
          this.EDhours = this.interactionforumdailogobject.eventEndDate.getHours() + 12;
          this.EDminutes = this.interactionforumdailogobject.eventEndDate.getMinutes();
          this.EDhours = (this.EDhours < 10) ? '0' + this.EDhours : this.EDhours;
          this.EDminutes = (this.EDminutes < 10) ? '0' + this.EDminutes : this.EDminutes;
          this.eventEndTime =  this.EDhours + ':'  + this.EDminutes + ' ' + 'am';
        } else if (this.interactionforumdailogobject.eventEndDate.getHours() === 0 &&
                 this.interactionforumdailogobject.eventEndDate.getMinutes() === 0) {
          this.eventEndTime = null;
        } else if (this.interactionforumdailogobject.eventEndDate.getHours() === 12 &&
                  this.interactionforumdailogobject.eventEndDate.getMinutes() >= 0) {
          this.EDhours = this.interactionforumdailogobject.eventEndDate.getHours();
          this.EDminutes = this.interactionforumdailogobject.eventEndDate.getMinutes();
          this.EDhours = (this.EDhours < 10) ? '0' + this.EDhours : this.EDhours;
          this.EDminutes = (this.EDminutes < 10) ? '0' + this.EDminutes : this.EDminutes;
          this.eventEndTime =  this.EDhours + ':'  + this.EDminutes + ' ' + 'pm';
        } else {
          this.EDhours = this.interactionforumdailogobject.eventEndDate.getHours();
          this.EDminutes = this.interactionforumdailogobject.eventEndDate.getMinutes();
          this.EDhours = (this.EDhours < 10) ? '0' + this.EDhours : this.EDhours;
          this.EDminutes = (this.EDminutes < 10) ? '0' + this.EDminutes : this.EDminutes;
          this.eventEndTime =  this.EDhours + ':'  + this.EDminutes + ' ' + 'am';
        }
      }
      this.Options2 = JSON.parse(JSON.stringify(  data.editingdata.pollingOptions ));
      
     
    } else {
      this.showimageupload = true;
 if (data.name === 'classifiedallevents') {
      this.data_source = [{categoryId: 6, categoryName: 'Classifieds', typeId: null, catergoryURL: null}];
      this.interactionforumdailogobject.categoryId = 6;
    } else if (data.name === 'lost&foundallevents') {
      this.data_source = [{ categoryId: 8, categoryName: 'Lost & Found', typeId: null, catergoryURL: null }];
      this.interactionforumdailogobject.categoryId = 8;
    } else if (data.name === 'pollingallevents') {
      this.data_source = [{ categoryId: 7, categoryName: 'Polling', typeId: null, catergoryURL: null }];
      this.interactionforumdailogobject.categoryId = 7;
    } else {
      this.getCategoryList();
    }
    }
   }
  datePickerConfig = {
    format: 'hh:mm a'
  };
  configIF: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    translate: 'no',
  };
  openET() {
    this.ETdatePickerDirective.api.open();
  }
  openST() {
    this.STdatePickerDirective.api.open();
  }
  onNoClick(): void {
    // tslint:disable-next-line:max-line-length
    this.sendResponseAfterpopclose = undefined;
    const dialogRef = this.dialog.open(ConfirmDailogComponent,
                      { width: '30%', data: { warning: 'Are you sure you want to exit from this screen ?' } });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.sendResponseAfterpopclose = undefined;
        this.dialogRef.close(this.sendResponseAfterpopclose);
      } else {
        this.sendResponseAfterpopclose = null;
      }
    });
  }
  openInput() {
    this.sendResponseAfterpopclose = undefined;
    // your can use ElementRef for this later
    document.getElementById('upload').click();
  }

  checkForoptionDisabled(optiondesc) {
    if (optiondesc.trim().length === 0) {
      this.disableOptionButton = true;
    } else {
      this.disableOptionButton = false;
    }
  }

  onFileChange(evt) {
    this.imageuploadservice.imageupload(evt, this.emptyImageData).then((result: any) => {
      this.sendResponseAfterpopclose = null;
      this.imageobject = result;
      this.interactionforumdailogobject.imageData = this.imageobject;
      }, (error) => {
         console.log(error);
      });
  }

  ngOnInit() {
    // this.form = this.formBuilder.group({
    //   categoryId: [null, Validators.required],
    //   eventStartDate: [null],
    //   eventEndDate: [null],
    //   eventName: [null, Validators.required],
    //   eventDescription: [null, Validators.required],
    //   updatedBy: [21375],
    //   createdBy: [21375],
    //   imageData: [[]],
    //   pollingOptions : [[]]
    // });
   // this.Options2 = [];

  }
  getCategoryList() {
    this.businesslogic.get('interaction_forums/getCategoryDropDownSelection').subscribe((response: any) => {
      this.data_source = response;
    });
  }


  updateOption(optionDetails) {
    this.hideUpdateButton = true;
    this.optionDescription = optionDetails.optionDescription;

    this.editingId = optionDetails.optionNumber;
  }

  updatedOptionid(optionDesc) {
    this.Options2.map((item, i) => {
      if (item.optionNumber === this.editingId) {

        this.Options2[i].optionDescription = optionDesc;
        this.hideUpdateButton = false;
        this.optionDescription = '';
        this.disableCommentButton = true;
      }
    });
  }

  AddOption(optionDes) {
    // this.option.optionDescription = '';
    // optionDes.optionnumber = optionDes.optionnumber +1;
    //  this.Options2.push(optionDes);
    //  console.log(this.Options2);
    this.disableCommentButton = true;
    this.optionDescription = '';
    this.optionNumber = this.optionNumber + 1;
    this.Options2.push({
      optionNumber: this.optionNumber,
      optionDescription: optionDes,
      optionId: null,
      createdBy: this.businesslogic.employeeId,
      updatedBy: this.businesslogic.employeeId
    });

  }

  deleteoption(option): void {
    this.optionDescription = '';
    this.hideUpdateButton = false;
    const index = this.Options2.indexOf(option);
    if (index >= 0) {
      this.Options2.splice(index, 1);
    }
  }

  checkForCommentDisabled(commentcontent) {
    if (commentcontent.trim().length === 0) {
      this.disableCommentButton = true;
    } else {
      this.disableCommentButton = false;
    }
  }

  postUpdate(postForm: NgForm) {
    if (this.sendResponseAfterpopclose !== undefined) {
      const SD = this.interactionforumdailogobject.eventStartDate;
      const ED = this.interactionforumdailogobject.eventEndDate;
      if (this.interactionforumdailogobject.categoryId === 7) {
          if (this.eventStartTime != null) {
            if (this.eventStartTime.slice(6) === 'pm') {
              if (Number(this.eventStartTime.slice(0, 2)) === 12) {
                this.Stimehours = Number(this.eventStartTime.slice(0, 2));
              } else {
                this.Stimehours = Number(this.eventStartTime.slice(0, 2)) + 12;
              }
              this.Stimeminutes = Number(this.eventStartTime.slice(3, 5));
            } else {
              if (Number(this.eventStartTime.slice(0, 2)) === 12 && Number(this.eventStartTime.slice(3, 5)) >= 0 ) {
                this.Stimehours = 0;
              } else {
                this.Stimehours = Number(this.eventStartTime.slice(0, 2));
              }
              this.Stimeminutes = Number(this.eventStartTime.slice(3, 5));
            }

          }

          if (this.eventEndTime != null) {
            if (this.eventEndTime.slice(6) === 'pm') {
              if (Number(this.eventEndTime.slice(0, 2)) === 12) {
                this.Etimehours = Number(this.eventEndTime.slice(0, 2));
              } else {
                this.Etimehours = Number(this.eventEndTime.slice(0, 2)) + 12;
              }
              this.Etimeminutes = Number(this.eventEndTime.slice(3, 5));
            } else {
              if (Number(this.eventEndTime.slice(0, 2)) === 12 && Number(this.eventEndTime.slice(3, 5)) >= 0 ) {
                this.Etimehours = 0;
              } else {
                this.Etimehours = Number(this.eventEndTime.slice(0, 2));
              }
              this.Etimeminutes = Number(this.eventEndTime.slice(3, 5));
            }
          }

            if (this.interactionforumdailogobject.eventStartDate != null) {
              if (this.eventStartTime != null && this.eventStartTime !== '') {
                const Stotaldate = new Date(SD.getFullYear(), SD.getMonth(),
                  SD.getDate(), this.Stimehours, this.Stimeminutes
                );
                this.interactionforumdailogobject.eventStartDate = Stotaldate.getTime();
              } else {
                const Stotaldate = new Date(SD.getFullYear(), SD.getMonth(),
                SD.getDate(), 0, 0
              );
                this.interactionforumdailogobject.eventStartDate = Stotaldate.getTime();
              }
            }
            if (this.interactionforumdailogobject.eventEndDate != null) {
              if (this.eventEndTime != null && this.eventEndTime !== '') {
                const Etotaldate = new Date(ED.getFullYear(), ED.getMonth(),
                  ED.getDate(), this.Etimehours, this.Etimeminutes
                );
                this.interactionforumdailogobject.eventEndDate = Etotaldate.getTime();
              } else {
                const Etotaldate = new Date(ED.getFullYear(), ED.getMonth(),
                ED.getDate(), 23, 59
              );
                this.interactionforumdailogobject.eventEndDate = Etotaldate.getTime();

              }

            }
            if (this.interactionforumdailogobject.eventEndDate != null) {
              if (this.eventEndTime != null) {
                if (this.interactionforumdailogobject.eventStartDate >= this.interactionforumdailogobject.eventEndDate) {
                  this.interactionforumdailogobject.eventStartDate = new Date(this.interactionforumdailogobject.eventStartDate);
                  this.interactionforumdailogobject.eventEndDate = new Date(this.interactionforumdailogobject.eventEndDate);
                  this.snackBar.open('End time cannot be prior to start time', '', { duration: 3000, panelClass: ['warningMessage'] });
                } else {
                  this.interactionforumdailogobject.pollingOptions = this.Options2;
                  this.businesslogic.postUpdate('interaction_forums/postAnDiscussion',
                    this.interactionforumdailogobject).subscribe((response: any) => {
                      this.dialogRef.close(response);
                    });
                }
              } else {
                this.interactionforumdailogobject.pollingOptions = this.Options2;
                this.businesslogic.postUpdate('interaction_forums/postAnDiscussion',
                  this.interactionforumdailogobject).subscribe((response: any) => {
                    this.dialogRef.close(response);
                  });
              }
            } else {
              this.interactionforumdailogobject.pollingOptions = this.Options2;
              this.businesslogic.postUpdate('interaction_forums/postAnDiscussion',
                this.interactionforumdailogobject).subscribe((response: any) => {
                  this.dialogRef.close(response);
                });
            }
      } else {
        if (this.eventStartTime != null) {
          if (this.eventStartTime.slice(6) === 'pm') {
            if (Number(this.eventStartTime.slice(0, 2)) === 12) {
              this.Stimehours = Number(this.eventStartTime.slice(0, 2));
            } else {
              this.Stimehours = Number(this.eventStartTime.slice(0, 2)) + 12;
            }
            this.Stimeminutes = Number(this.eventStartTime.slice(3, 5));
          } else {
            if (Number(this.eventStartTime.slice(0, 2)) === 12 && Number(this.eventStartTime.slice(3, 5)) >= 0 ) {
              this.Stimehours = 0;
            } else {
              this.Stimehours = Number(this.eventStartTime.slice(0, 2));
            }
            this.Stimeminutes = Number(this.eventStartTime.slice(3, 5));
          }

        }

        if (this.eventEndTime != null) {
          if (this.eventEndTime.slice(6) === 'pm') {
            if (Number(this.eventEndTime.slice(0, 2)) === 12) {
              this.Etimehours = Number(this.eventEndTime.slice(0, 2));
            } else {
              this.Etimehours = Number(this.eventEndTime.slice(0, 2)) + 12;
            }
            this.Etimeminutes = Number(this.eventEndTime.slice(3, 5));
          } else {
            if (Number(this.eventEndTime.slice(0, 2)) === 12 && Number(this.eventEndTime.slice(3, 5)) >= 0 ) {
              this.Etimehours = 0;
            } else {
              this.Etimehours = Number(this.eventEndTime.slice(0, 2));
            }
            this.Etimeminutes = Number(this.eventEndTime.slice(3, 5));
          }
        }


        if (this.interactionforumdailogobject.eventStartDate != null) {
          if (this.eventStartTime != null && this.eventStartTime !== '') {
            const Stotaldate = new Date(SD.getFullYear(), SD.getMonth(),
              SD.getDate(), this.Stimehours, this.Stimeminutes
            );
            this.interactionforumdailogobject.eventStartDate = Stotaldate.getTime();
          } else {
            const Stotaldate = new Date(SD.getFullYear(), SD.getMonth(),
              SD.getDate(), 0, 0
            );
            this.interactionforumdailogobject.eventStartDate = Stotaldate.getTime();

          }
        }
        if (this.interactionforumdailogobject.eventEndDate != null) {
          if (this.eventEndTime != null && this.eventEndTime !== '') {
            const Etotaldate = new Date(ED.getFullYear(), ED.getMonth(),
              ED.getDate(), this.Etimehours, this.Etimeminutes
            );
            this.interactionforumdailogobject.eventEndDate = Etotaldate.getTime();
          } else {
            const Etotaldate = new Date(ED.getFullYear(), ED.getMonth(),
            ED.getDate(), 23, 59
          );
            this.interactionforumdailogobject.eventEndDate = Etotaldate.getTime();

          }
        }
        if (this.interactionforumdailogobject.eventEndDate != null) {
          if (this.eventEndTime != null) {
            if (this.interactionforumdailogobject.eventStartDate >= this.interactionforumdailogobject.eventEndDate) {
              this.interactionforumdailogobject.eventStartDate = new Date(this.interactionforumdailogobject.eventStartDate);
              this.interactionforumdailogobject.eventEndDate = new Date(this.interactionforumdailogobject.eventEndDate);
              this.snackBar.open('End time cannot be prior to start time', '', { duration: 3000, panelClass: ['warningMessage'] });
            } else {
              this.interactionforumdailogobject.pollingOptions = null;
              this.businesslogic.postUpdate('interaction_forums/postAnDiscussion',
                this.interactionforumdailogobject).subscribe((response: any) => {
                  this.dialogRef.close(response);
                });
            }
          } else {
            this.interactionforumdailogobject.pollingOptions = null;
            this.businesslogic.postUpdate('interaction_forums/postAnDiscussion',
              this.interactionforumdailogobject).subscribe((response: any) => {
                this.dialogRef.close(response);
              });
          }
        } else {
          this.interactionforumdailogobject.pollingOptions = null;
          this.businesslogic.postUpdate('interaction_forums/postAnDiscussion',
            this.interactionforumdailogobject).subscribe((response: any) => {
              this.dialogRef.close(response);
            });
        }
      }


    }
  }

  removeImageBeforePost(image): void {
    this.interactionforumdailogobject.imageData = this.imageuploadservice.removeimage(image, this.imageobject);
  }
}

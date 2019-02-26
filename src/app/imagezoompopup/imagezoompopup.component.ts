import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-imagezoompopup',
  templateUrl: './imagezoompopup.component.html',
  styleUrls: ['./imagezoompopup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImagezoompopupComponent implements OnInit {
  imageIndexOne: number;
  constructor(public dialogRef: MatDialogRef<ImagezoompopupComponent>,
  @Inject(MAT_DIALOG_DATA) public imagearraydata: any ) {
    this.imageIndexOne = imagearraydata.indexvalue;
  }

  ngOnInit() {
  }
  onNoClick() {
    this.dialogRef.close();
  }
}

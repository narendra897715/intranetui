import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-wishes-sent',
  templateUrl: './wishes-sent.component.html',
  styleUrls: ['./wishes-sent.component.scss']
})
export class WishesSentComponent implements OnInit {

  constructor(private matDialogRef: MatDialogRef<WishesSentComponent>) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.matDialogRef.close();
  }

}

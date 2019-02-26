import { Component, OnInit, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:use-host-property-decorator
  host: { 'class': 'section main hbox space-between' }
})
export class PeopleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    }

}

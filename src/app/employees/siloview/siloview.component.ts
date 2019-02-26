import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BusinessLogicService } from '../../business-logic.service';
@Component({
  selector: 'app-siloview',
  templateUrl: './siloview.component.html',
  styleUrls: ['./siloview.component.scss'],
  // host: { 'class': 'section main hbox space-between' }
})
export class SiloviewComponent implements OnInit {
  employeeID: any;
  details: any;
  plusandminus: number;
  constructor(private router: Router, private route: ActivatedRoute, private businesslogic: BusinessLogicService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.employeeID = params.data;
    });
    this.siloviewstructure();
  }

  siloviewstructure() {
    this.businesslogic.post('employee/employeeSiloView', { 'employeeId': this.employeeID }).subscribe((response: any) => {
      this.details = response;
      this.plusandminus = response.length - 1;
    });
  }
  minimous(level) {
    this.plusandminus = level;
  }
  maxomous(level) {
    this.plusandminus = level + 1;
  }
  goBackToEmployeeInfo() {
    this.router.navigate(['intranet/people/employee', { id: this.employeeID, value: "true" }
   ]);
  }
}
